import { Autor } from "../types/autor.types"

const autores: Autor[] = [
  { id: 1, nombre: "Gabriel García Márquez" },
  { id: 2, nombre: "Umberto Eco" },
  { id: 3, nombre: "George Orwell" },
  { id: 4, nombre: "Antoine de Saint-Exupéry" },
  { id: 5, nombre: "Miguel de Cervantes" },
  { id: 6, nombre: "Paulo Coelho" }
];

let proximoId = 7;

export function findAll(): Autor[] {
    return autores;
}

export function findById(id: number): Autor | undefined {
    return autores.find(l => l.id === id)
}

export function create(datos: Omit<Autor, "id">): Autor {
    const nuevo: Autor = {id:proximoId++, ...datos};
    autores.push(nuevo);
    return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const i = autores.findIndex(autor => autor.id === id);
  if (i === -1) return undefined;
  autores[i] = { id, ...datos };
  return autores[i];
}

export function remove(id: number): boolean {
  const i = autores.findIndex(autor => autor.id === id);
  if (i === -1) return false;
  autores.splice(i, 1);
  return true;
}