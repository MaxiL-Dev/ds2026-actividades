import { prisma } from "../src/config/prisma.ts";


const libros = [
  {titulo: "Cien años de soledad", autor: "Gabriel García Márquez", imagen: "", precio: 15000, disponible: true },
  {titulo: "El nombre de la rosa", autor: "Umberto Eco", imagen: "", precio: 18000, disponible: false },
  {titulo: "1984", autor: "George Orwell", imagen: "", precio: 14000, disponible: true },
  {titulo: "El Principito", autor: "Antoine de Saint-Exupéry", imagen: "", precio: 12000, disponible: true },
  {titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", imagen: "", precio: 16000, disponible: false },
  {titulo: "El alquimista", autor: "Paulo Coelho", imagen: "", precio: 13000, disponible: true }
 
];
const autores = [
  {nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  {nombre: "Umberto Eco", nacionalidad: "Italia" },
  {nombre: "George Orwell", nacionalidad: "Gran Bretaña" },
  {nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  {nombre: "Miguel de Cervantes", nacionalidad: "España" },
  {nombre: "Paulo Coelho", nacionalidad: "Brasil" }
];
async function main() {
 await prisma.libro.createMany({ data: libros });
 await prisma.autor.createMany({ data: autores });
}
main();
