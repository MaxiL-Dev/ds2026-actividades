import type { SignOptions } from "jsonwebtoken";

function obligatorio(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) throw new Error(`Falta ${nombre} en el env`); 
  return valor;
}

export const JWT_SECRET = obligatorio("JWT_SECRET");
export const JWT_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];
export const SALT_ROUNDS = 10;