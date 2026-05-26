import { useState } from "react";
import img1984 from "./assets/1984.jpg";
import imgCien from "./assets/cien años de soledad.jpg";
import imgQuijote from "./assets/don quijote de la mancha.jpg";
import imgAlquimista from "./assets/el alquimista.jfif";
import imgRosa from "./assets/el nombre de la rosa.jpg";
import imgPrincipito from "./assets/el principito.jpeg";
import imgLibros from "./assets/libros.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  img: string;
  likes: number;
}

const librosDestacados: Libro[] = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", img: imgCien, likes: 0 },
  { id: 2, titulo: "El nombre de la rosa", autor: "Umberto Eco", img: imgRosa, likes: 0 },
  { id: 3, titulo: "1984", autor: "George Orwell", img: img1984, likes: 0 },
  { id: 4, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", img: imgPrincipito, likes: 0 },
  { id: 5, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", img: imgQuijote, likes: 0 },
  { id: 6, titulo: "El alquimista", autor: "Paulo Coelho", img: imgAlquimista, likes: 0 },
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container-fluid">
        <img src={imgLibros} alt="" height="27" />
        <span className="navbar-brand">Librería</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link activo" aria-current="page" href="#">home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./catalogo.html">catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./contacto.html">contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="container-fluid justify-content-center hero">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 text-center">
          <h1>Bienvenidos a la librería</h1>
        </div>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h2>Esperamos que disfrutes de nuestra selección de libros</h2>
        </div>
      </div>
      <div className="row justify-content-center text-center mt-4">
        <div className="col-12">
          <a className="btn btn-primary" href="catalogo.html">Ver catálogo</a>
        </div>
      </div>
    </div>
  );
}

interface LibroCardProps {
  libro: Libro;
  onLike: (id: number) => void;
}

function LibroCard({ libro, onLike }: LibroCardProps) {
  return (
    <div className="col-12 col-sm-8 col-md-4">
      <div className="card libro-card">
        <img src={libro.img} className="card-img-top" alt={libro.titulo} />
        <div className="card-body">
          <h5 className="card-title">{libro.titulo}</h5>
          <p className="card-text">{libro.autor}</p>
        </div>
        <div className="card-body d-flex gap-2 align-items-stretch">
          <a href="./libro.html" className="btn btn-primary flex-grow-1">Ver más</a>
          <button
            className="btn btn-like"
            onClick={() => onLike(libro.id)}
            title="Me gusta"
          >
            ❤️ {libro.likes}
          </button>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [libros, setLibros] = useState<Libro[]>(librosDestacados);

  const handleLike = (id: number) => {
    setLibros((prev) =>
      prev.map((l) => (l.id === id ? { ...l, likes: l.likes + 1 } : l))
    );
  };

  return (
    <>
      <Navbar />

      <Hero />

      <div className="container-fluid justify-content-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 text-center">
            <h2 id="libros-d">Libros destacados</h2>
          </div>
        </div>
      </div>

      <div className="container-fluid cards-section">
        <div className="row justify-content-center g-4">
          {libros.slice(0, 3).map((libro) => (
            <LibroCard key={libro.id} libro={libro} onLike={handleLike} />
          ))}
        </div>
        <div className="row justify-content-center g-4 mt-2">
          {libros.slice(3).map((libro) => (
            <LibroCard key={libro.id} libro={libro} onLike={handleLike} />
          ))}
        </div>
      </div>

    </>
  );
}
