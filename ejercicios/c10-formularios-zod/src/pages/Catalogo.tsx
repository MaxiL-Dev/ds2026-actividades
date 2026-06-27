import { Link } from 'react-router-dom'; // Importamos Link para la navegación interna 
import Libros from '../assets/libros.png';

export interface LibroApi {
  key: string;
  title: string;
  author_name: string[];
  image: string;
}

interface CatalogoProps {
  libros: LibroApi[];
}

function Catalogo({ libros }: CatalogoProps) {
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 d-flex justify-content-between align-items-center border-bottom pb-3">
            <h2 id="titulo-catalogo" style={{ color: '#fff2ba' }} className="m-0">
              Catálogo de Libros
            </h2>

            <Link 
              to="/libros/nuevo" 
              className="btn-primary text-decoration-none d-inline-flex align-items-center justify-content-center gap-2" 
              style={{ width: 'auto', marginTop: 0 }}
            >
              <i className="bi bi-plus-circle"></i> Agregar Libro
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid cards-section mt-4 mb-5">
        {libros.length === 0 && (
          <p className="text-center text-light mt-5">
            No hay libros en el catálogo. ¡Presioná el botón de arriba para agregar uno nuevo!
          </p>
        )}

        <div className="row justify-content-center g-4">
          {libros.map((libro) => (
            <div key={libro.key} className="col-12 col-sm-8 col-md-4 col-lg-3">
              <div className="card libro-card h-100 shadow-sm">
                <img 
                  src={libro.image || Libros} 
                  className="card-img-top" 
                  alt={libro.title} 
                  style={{ height: '300px', objectFit: 'cover' }} 
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{libro.title}</h5>
                  <p className="card-text text-muted small mt-auto">
                    {libro.author_name.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Catalogo;