import { Prisma } from "../generated/prisma/client";
import { prisma } from "../config/prisma";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroConCategorias = Prisma.LibroGetPayload<{ include: { autor: true, categorias: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true, categorias: true } }>;

export type LibroCreate = Prisma.LibroUncheckedCreateInput & { categoriasIds?: number[] };
export type LibroUpdate = Prisma.LibroUncheckedUpdateInput & { categoriasIds?: number[] };

export async function findAll(disponible?: boolean, categoria?: string): Promise<LibroConCategorias[]> {
  return prisma.libro.findMany({ 
    where: { 
      disponible: disponible !== undefined ? disponible : undefined,
      categorias: categoria ? { some: { nombre: categoria } } : undefined
    },
    include: { autor: true, categorias: true }
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({ 
    where: { id },
    include: { autor: true, categorias: true } 
  });
}

export async function create(datos: LibroCreate): Promise<LibroConCategorias> {
  const { categoriasIds, ...rest } = datos;

  return prisma.libro.create({ 
    data: {
      ...rest,
      categorias: categoriasIds && categoriasIds.length > 0
        ? { connect: categoriasIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { autor: true, categorias: true } 
  });
}

export async function update(id: number, datos: LibroUpdate): Promise<LibroConCategorias | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;

  const { categoriasIds, ...rest } = datos;

  return prisma.libro.update({
    where: { id },
    data: {
      ...rest,
      categorias: categoriasIds
        ? { set: categoriasIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { autor: true, categorias: true }
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;

  await prisma.libro.delete({ where: { id } });
  return true;
}

export async function findByAutor(autorId: number): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: { autorId },
    include: { autor: true }
  });
}

