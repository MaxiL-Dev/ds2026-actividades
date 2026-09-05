import { prisma } from "../src/config/prisma.ts";
import bcrypt from "bcrypt";

const autores = [
  {nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  {nombre: "Umberto Eco", nacionalidad: "Italia" },
  {nombre: "George Orwell", nacionalidad: "Gran Bretaña" },
  {nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  {nombre: "Miguel de Cervantes", nacionalidad: "España" },
  {nombre: "Paulo Coelho", nacionalidad: "Brasil" }
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ficción" },
  { nombre: "Distopía" },
  { nombre: "Clásico" }
];

const libros = [
  {titulo: "Cien años de soledad", autor: "Gabriel García Márquez", imagen: "", precio: 15000, disponible: true, cats: ["Novela", "Ficción"] },
  {titulo: "El nombre de la rosa", autor: "Umberto Eco", imagen: "", precio: 18000, disponible: false, cats: ["Novela", "Clásico"] },
  {titulo: "1984", autor: "George Orwell", imagen: "", precio: 14000, disponible: true, cats: ["Novela", "Distopía"] },
  {titulo: "El Principito", autor: "Antoine de Saint-Exupéry", imagen: "", precio: 12000, disponible: true, cats: ["Novela", "Clásico"] },
  {titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", imagen: "", precio: 16000, disponible: false, cats: ["Novela", "Clásico"] },
  {titulo: "El alquimista", autor: "Paulo Coelho", imagen: "", precio: 13000, disponible: true, cats: ["Novela", "Ficción"] }
];

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" }
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true }); 
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true }); 

  for (const { password, ...datos } of usuarios) { 
    await prisma.usuario.upsert({
      where: { email: datos.email }, 
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }
  
  for (const { autor, cats, ...datos } of libros) { 
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { 
          connect: { nombre: autor } 
        },
        categorias: { 
          connect: cats.map(nombre => ({ nombre })) 
        }
      }
    });
  }
}

main();