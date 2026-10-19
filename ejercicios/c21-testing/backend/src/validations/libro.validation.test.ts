import { describe, it, expect } from "vitest";
import { libroCreateSchema, idParamSchema } from "./libro.validation";

describe("Validaciones de Libros (Zod)", () => {
  describe("libroCreateSchema", () => {
    it("debe rechazar un precio negativo", () => {
      const resultado = libroCreateSchema.safeParse({
        titulo: "Rayuela",
        precio: -100,
        autorId: 1,
      });

      expect(resultado.success).toBe(false);
      if (!resultado.success) {
        const errorPrecio = resultado.error.issues.find((i) => i.path.includes("precio"));
        expect(errorPrecio?.message).toBe("El precio debe ser mayor a 0");
      }
    });

    it("debe rechazar un precio igual a 0", () => {
      const resultado = libroCreateSchema.safeParse({
        titulo: "Rayuela",
        precio: 0,
        autorId: 1,
      });

      expect(resultado.success).toBe(false);
      if (!resultado.success) {
        const errorPrecio = resultado.error.issues.find((i) => i.path.includes("precio"));
        expect(errorPrecio?.message).toBe("El precio debe ser mayor a 0");
      }
    });

    it("debe recortar espacios en blanco del título con trim", () => {
      const resultado = libroCreateSchema.safeParse({
        titulo: "   Ficciones   ",
        precio: 12000,
        autorId: 1,
      });

      expect(resultado.success).toBe(true);
      if (resultado.success) {
        expect(resultado.data.titulo).toBe("Ficciones");
      }
    });

    it("debe aceptar un libro válido con campos opcionales", () => {
      const datos = {
        titulo: "El túnel",
        precio: 9500,
        imagen: "http://example.com/portada.jpg",
        disponible: true,
        autorId: 2,
        categoriasIds: [1, 3],
      };

      const resultado = libroCreateSchema.safeParse(datos);

      expect(resultado.success).toBe(true);
      if (resultado.success) {
        expect(resultado.data.titulo).toBe("El túnel");
        expect(resultado.data.precio).toBe(9500);
        expect(resultado.data.autorId).toBe(2);
        expect(resultado.data.categoriasIds).toEqual([1, 3]);
      }
    });

    it("debe rechazar si falta el título o el autorId", () => {
      const sinTitulo = libroCreateSchema.safeParse({ precio: 1000, autorId: 1 });
      const sinAutor = libroCreateSchema.safeParse({ titulo: "Libro", precio: 1000 });

      expect(sinTitulo.success).toBe(false);
      expect(sinAutor.success).toBe(false);
    });
  });

  describe("idParamSchema", () => {
    it("debe convertir un string numérico a number (coerción)", () => {
      const resultado = idParamSchema.safeParse({ id: "42" });

      expect(resultado.success).toBe(true);
      if (resultado.success) {
        expect(resultado.data.id).toBe(42);
        expect(typeof resultado.data.id).toBe("number");
      }
    });

    it("debe rechazar un id no numérico", () => {
      const resultado = idParamSchema.safeParse({ id: "no-es-un-numero" });

      expect(resultado.success).toBe(false);
    });

    it("debe rechazar un id menor o igual a 0", () => {
      const resNegativo = idParamSchema.safeParse({ id: "-5" });
      const resCero = idParamSchema.safeParse({ id: "0" });

      expect(resNegativo.success).toBe(false);
      expect(resCero.success).toBe(false);
    });
  });
});
