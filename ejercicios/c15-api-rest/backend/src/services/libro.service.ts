import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", img: "", likes: 0, descripcion: "Una obra maestra...", precio: 15000, disponible: true },
  { id: 2, titulo: "El nombre de la rosa", autor: "Umberto Eco", img: "", likes: 0, descripcion: "Un thriller...", precio: 18000, disponible: false },
  { id: 3, titulo: "1984", autor: "George Orwell", img: "", likes: 0, descripcion: "Una novela distópica...", precio: 14000, disponible: true },
  { id: 4, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", img: "", likes: 0, descripcion: "Una historia clásica...", precio: 12000, disponible: true },
  { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", img: "", likes: 0, descripcion: "La obra maestra...", precio: 16000, disponible: false },
  { id: 6, titulo: "El alquimista", autor: "Paulo Coelho", img: "", likes: 0, descripcion: "Una novela sobre el viaje...", precio: 13000, disponible: true }
];

let proximoId = 7;

export function findAll(disponible?: boolean): Libro[] {
    if (disponible === undefined) return libros;
    return libros.filter(l => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
    return libros.find(l => l.id === id)
}

export function create(datos: Omit<Libro, "id">): Libro {
    const nuevo: Libro = {id:proximoId++, ...datos};
    libros.push(nuevo);
    return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return undefined;
  libros[i] = { id, ...datos };
  return libros[i];
}

export function remove(id: number): boolean {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}