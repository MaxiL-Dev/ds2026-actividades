import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true, categorias: true } }>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({ 
    where: disponible !== undefined ? { disponible } : undefined,
    include: { autor: true } 
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({ 
    where: { id },
    include: { autor: true, categorias: true } 
  });
}

export async function create(datos: Prisma.LibroUncheckedCreateInput): Promise<LibroConAutor> {
  return prisma.libro.create({ 
    data: datos,
    include: { autor: true } 
  });
}

export async function update(id: number, datos: Prisma.LibroUncheckedUpdateInput): Promise<LibroConAutor | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;

  return prisma.libro.update({
    where: { id },
    data: datos,
    include: { autor: true }
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;

  await prisma.libro.delete({ where: { id } });
  return true;
}