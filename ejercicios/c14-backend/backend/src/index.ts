import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería" });
});

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  img: string;
  likes: number;
  descripcion: string;
  precio: number;
  disponible: boolean; 
}

const libros: Libro[] = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", img: "", likes: 0, descripcion: "Una obra maestra...", precio: 15000, disponible: true },
  { id: 2, titulo: "El nombre de la rosa", autor: "Umberto Eco", img: "", likes: 0, descripcion: "Un thriller...", precio: 18000, disponible: false },
  { id: 3, titulo: "1984", autor: "George Orwell", img: "", likes: 0, descripcion: "Una novela distópica...", precio: 14000, disponible: true },
  { id: 4, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", img: "", likes: 0, descripcion: "Una historia clásica...", precio: 12000, disponible: true },
  { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", img: "", likes: 0, descripcion: "La obra maestra...", precio: 16000, disponible: false },
  { id: 6, titulo: "El alquimista", autor: "Paulo Coelho", img: "", likes: 0, descripcion: "Una novela sobre el viaje...", precio: 13000, disponible: true }
];

app.get("/libros", (req, res) => {

  const { disponible } = req.query;

  if (disponible === "true") {
    const librosFiltrados = libros.filter(libro => libro.disponible === true);
    return res.json(librosFiltrados); 
  }

  res.json(libros);

});

const autores = [
  { id: 1, nombre: "Gabriel García Márquez" },
  { id: 2, nombre: "Umberto Eco" },
  { id: 3, nombre: "George Orwell" },
  { id: 4, nombre: "Antoine de Saint-Exupéry" },
  { id: 5, nombre: "Miguel de Cervantes" },
  { id: 6, nombre: "Paulo Coelho" }
];

app.get("/autores", (_req, res) => {
  res.json(autores);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});