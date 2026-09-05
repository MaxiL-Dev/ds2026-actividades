import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { SALT_ROUNDS } from "../config/env";

export async function registrar(datos: any) {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);
  
  return prisma.usuario.create({
    data: { nombre: datos.nombre, email: datos.email, passwordHash: hash },
    select: { id: true, email: true, nombre: true, rol: true },
  });
}