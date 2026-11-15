import { describe, it, expect } from "vitest";
import { loginSchema, registroSchema } from "./auth.validation";

describe("Validaciones de Autenticación (Zod)", () => {
  describe("loginSchema", () => {
    it("debe normalizar el email con trim y pasarlo a minúsculas", () => {
      const resultado = loginSchema.safeParse({
        email: "   Usuario.Test@CORREO.COM   ",
        password: "Password123",
      });

      expect(resultado.success).toBe(true);
      if (resultado.success) {
        expect(resultado.data.email).toBe("usuario.test@correo.com");
      }
    });

    it("debe rechazar un email con formato inválido", () => {
      const resultado = loginSchema.safeParse({
        email: "no-es-un-email",
        password: "Password123",
      });

      expect(resultado.success).toBe(false);
      if (!resultado.success) {
        const errorEmail = resultado.error.issues.find((i) => i.path.includes("email"));
        expect(errorEmail?.message).toBe("Email inválido");
      }
    });

    it("debe rechazar si falta la contraseña o está vacía", () => {
      const sinPassword = loginSchema.safeParse({
        email: "usuario@libreria.test",
        password: "",
      });

      expect(sinPassword.success).toBe(false);
      if (!sinPassword.success) {
        const errorPass = sinPassword.error.issues.find((i) => i.path.includes("password"));
        expect(errorPass?.message).toBe("La contraseña es obligatoria");
      }
    });
  });

  describe("registroSchema", () => {
    it("debe acumular múltiples errores cuando la contraseña es débil", () => {
      const resultado = registroSchema.safeParse({
        nombre: "Juan Perez",
        email: "juan@libreria.test",
        password: "abc", // Menor a 8 chars, sin mayúscula, sin número
      });

      expect(resultado.success).toBe(false);
      if (!resultado.success) {
        const mensajes = resultado.error.issues
          .filter((i) => i.path.includes("password"))
          .map((i) => i.message);

        expect(mensajes).toContain("La contraseña necesita al menos 8 caracteres");
        expect(mensajes).toContain("Necesita al menos una mayúscula");
        expect(mensajes).toContain("Necesita al menos un número");
        expect(mensajes.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("debe aceptar un registro válido con contraseña robusta", () => {
      const resultado = registroSchema.safeParse({
        nombre: "María Lopez",
        email: "maria@libreria.test",
        password: "PasswordSeguro2026",
      });

      expect(resultado.success).toBe(true);
      if (resultado.success) {
        expect(resultado.data.nombre).toBe("María Lopez");
        expect(resultado.data.email).toBe("maria@libreria.test");
      }
    });

    it("debe rechazar si el nombre está vacío", () => {
      const resultado = registroSchema.safeParse({
        nombre: "   ",
        email: "maria@libreria.test",
        password: "PasswordSeguro2026",
      });

      expect(resultado.success).toBe(false);
      if (!resultado.success) {
        const errorNombre = resultado.error.issues.find((i) => i.path.includes("nombre"));
        expect(errorNombre?.message).toBe("El nombre es obligatorio");
      }
    });
  });
});
