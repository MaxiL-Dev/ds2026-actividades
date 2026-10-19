import { describe, it, expect } from "vitest";
import { formatearPrecio } from "./formatearPrecio";

describe("formatearPrecio (Unitario puro Frontend)", () => {
  it("debe formatear un número entero en pesos argentinos", () => {
    const resultado = formatearPrecio(15000);
    // Normalizamos espacios no divisibles (\u00a0) por si el runtime de Intl los usa
    const normalizado = resultado.replace(/\u00a0/g, " ");
    expect(normalizado).toContain("15.000");
    expect(normalizado).toContain("$");
  });

  it("debe formatear cero pesos correctamente", () => {
    const resultado = formatearPrecio(0);
    const normalizado = resultado.replace(/\u00a0/g, " ");
    expect(normalizado).toContain("0");
    expect(normalizado).toContain("$");
  });

  it("debe redondear sin decimales por maximumFractionDigits: 0", () => {
    const resultado = formatearPrecio(1999.99);
    const normalizado = resultado.replace(/\u00a0/g, " ");
    expect(normalizado).toContain("2.000");
  });
});
