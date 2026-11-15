import { describe, it, expect, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticate, authorize } from "./auth.middleware";
import { JWT_SECRET } from "../config/env";

describe("Middleware de Autenticación y Autorización (Unitarios con Mocks)", () => {
  const crearMocksRespuesta = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    const next = vi.fn() as NextFunction;
    return { res, next };
  };

  describe("authorize", () => {
    it("debe rechazar con 403 a un usuario CLIENTE cuando se exige rol ADMIN sin llamar a next", () => {
      const req = {
        usuario: { id: 2, rol: "CLIENTE" },
      } as Request;

      const { res, next } = crearMocksRespuesta();
      const middleware = authorize("ADMIN");

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: "No tenés permiso para esta operación",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("debe permitir el acceso y llamar a next cuando el usuario es ADMIN", () => {
      const req = {
        usuario: { id: 1, rol: "ADMIN" },
      } as Request;

      const { res, next } = crearMocksRespuesta();
      const middleware = authorize("ADMIN");

      middleware(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("debe retornar 401 si no hay usuario en la request (no autenticado)", () => {
      const req = {} as Request;

      const { res, next } = crearMocksRespuesta();
      const middleware = authorize("ADMIN");

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "No autenticado" });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("authenticate", () => {
    it("debe poblar req.usuario y llamar a next cuando el token es válido", () => {
      const payload = { id: 10, rol: "ADMIN" as const };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as unknown as Request;

      const { res, next } = crearMocksRespuesta();

      authenticate(req, res, next);

      expect(req.usuario).toEqual({ id: 10, rol: "ADMIN" });
      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("debe retornar 401 con 'Token expirado' si el token expiró", () => {
      const payload = { id: 10, rol: "CLIENTE" as const };
      // Token expirado en el pasado
      const tokenExpirado = jwt.sign(payload, JWT_SECRET, { expiresIn: "-1s" });

      const req = {
        headers: {
          authorization: `Bearer ${tokenExpirado}`,
        },
      } as unknown as Request;

      const { res, next } = crearMocksRespuesta();

      authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Token expirado" });
      expect(next).not.toHaveBeenCalled();
    });

    it("debe retornar 401 con 'Token inválido' si el token fue adulterado", () => {
      const tokenAdulterado = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.token-trucho.firma-invalida";

      const req = {
        headers: {
          authorization: `Bearer ${tokenAdulterado}`,
        },
      } as unknown as Request;

      const { res, next } = crearMocksRespuesta();

      authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
      expect(next).not.toHaveBeenCalled();
    });

    it("debe retornar 401 con 'Falta el token' si no viene el header authorization", () => {
      const req = {
        headers: {},
      } as unknown as Request;

      const { res, next } = crearMocksRespuesta();

      authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Falta el token" });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
