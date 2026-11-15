import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export type AutorConLibros = Prisma.AutorGetPayload<{ include: { libros: true } }>;

export type Autor = Prisma.AutorGetPayload<{}>;

export async function findAll(): Promise<Autor[]> {
  return prisma.autor.findMany();
}

export async function findById(id: number): Promise<AutorConLibros | null> {
  return prisma.autor.findUnique({ 
    where: { id },
    include: { libros: true } 
  });
}

export async function create(datos: Prisma.AutorCreateInput): Promise<Autor> {
  return prisma.autor.create({ data: datos });
}

export async function update(id: number, datos: Prisma.AutorUpdateInput): Promise<Autor | null> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return null;

  return prisma.autor.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return false;

  await prisma.autor.delete({ where: { id } });
  return true;
}