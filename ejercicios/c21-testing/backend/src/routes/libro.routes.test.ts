import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, it, expect } from "vitest";
import app from "../app";
import { JWT_SECRET } from "../config/env";

describe("Rutas de Libros (Supertest - Matriz de Permisos sin DB)", () => {
  const adminToken = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
  const clienteToken = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });

  it("POST /api/libros sin token debe responder 401", async () => {
    const res = await request(app)
      .post("/api/libros")
      .send({ titulo: "Libro sin token", precio: 5000, autorId: 1 });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("POST /api/libros con token de CLIENTE debe responder 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${clienteToken}`)
      .send({ titulo: "Libro no permitido", precio: 5000, autorId: 1 });

    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      error: "No tenés permiso para esta operación",
    });
  });

  it("POST /api/libros con token de ADMIN pero body inválido debe responder 400 y validar contrato de detalles", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ precio: -5 }); // Falta titulo y autorId, y precio negativo

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Datos inválidos");
    expect(Array.isArray(res.body.detalles)).toBe(true);
    expect(res.body.detalles.length).toBeGreaterThan(0);

    // Verificamos el contrato de cada detalle: { campo, mensaje }
    for (const detalle of res.body.detalles) {
      expect(detalle).toHaveProperty("campo");
      expect(detalle).toHaveProperty("mensaje");
      expect(typeof detalle.campo).toBe("string");
      expect(typeof detalle.mensaje).toBe("string");
    }

    const camposConError = res.body.detalles.map((d: { campo: string }) => d.campo);
    expect(camposConError).toContain("titulo");
    expect(camposConError).toContain("precio");
  });

  it("POST /api/libros con token adulterado debe responder 401", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", "Bearer token-completamente-invalido")
      .send({ titulo: "Libro", precio: 1000, autorId: 1 });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Token inválido" });
  });

  it("DELETE /api/libros/1 con token de CLIENTE debe responder 403", async () => {
    const res = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${clienteToken}`);

    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      error: "No tenés permiso para esta operación",
    });
  });

  it("GET /api/no-existe debe responder 404", async () => {
    const res = await request(app).get("/api/no-existe");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada" });
  });
});
