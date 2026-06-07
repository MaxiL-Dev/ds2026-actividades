import { Link } from 'react-router-dom';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  img: string;
  likes: number;
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
          <Link to={`/libro/${libro.id}`} className="btn btn-primary flex-grow-1">Ver más</Link>
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

export default LibroCard;