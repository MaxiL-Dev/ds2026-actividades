/**
 * ⚠️ IMPORTANTE: Esta suite de tests de integración requiere que el contenedor
 * de Docker de PostgreSQL esté corriendo (ej. `docker compose up -d db`) y que
 * se hayan ejecutado las migraciones y el seed de datos (`npx prisma migrate deploy`
 * y `npx tsx prisma/seed.ts`).
 */
import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import app from "../app";
import { prisma } from "../config/prisma";

describe("Rutas de Autenticación (Supertest - Con Base de Datos)", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST /api/auth/login con credenciales válidas del seed debe responder 200, devolver token y usuario sin passwordHash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@libreria.test",
        password: "Admin1234",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(0);

    expect(res.body).toHaveProperty("usuario");
    expect(res.body.usuario).toMatchObject({
      email: "admin@libreria.test",
      nombre: "Admin",
      rol: "ADMIN",
    });
    expect(res.body.usuario.passwordHash).toBeUndefined();
  });

  it("POST /api/auth/login con contraseña incorrecta debe responder 401 'Credenciales inválidas'", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@libreria.test",
        password: "PasswordIncorrecta999",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });

  it("POST /api/auth/login con email inexistente debe responder 401 'Credenciales inválidas'", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "usuario_fantasma_123456@noexiste.test",
        password: "Password123",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});
