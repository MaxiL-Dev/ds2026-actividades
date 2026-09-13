import { Link } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch'; 
import Libros from '../assets/libros.png';

export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface LibroApi {
  id: number;
  titulo: string;
  autor: Autor;
  imagen: string;
  precio: number;
  disponible: boolean;
}

function Catalogo() {

  
  const { data: libros, loading, error } = useFetch<LibroApi[]>(`${import.meta.env.VITE_API_URL}/libros`);

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
        {loading && (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="light" />
            <p className="text-light mt-2">Cargando la biblioteca...</p>
          </div>
        )}

        {error && (
          <div className="d-flex justify-content-center mt-5">
            <Alert variant="danger" className="w-50 text-center">
              {error}
            </Alert>
          </div>
        )}

        {!loading && !error && (!libros || libros.length === 0) && (
          <p className="text-center text-light mt-5">
            No hay libros en el catálogo.
          </p>
        )}

        {!loading && !error && libros && (
          <div className="row justify-content-center g-4">
            {libros.map((libro) => (
              <div key={libro.id} className="col-12 col-sm-8 col-md-4 col-lg-3">
                <div className="card libro-card h-100 shadow-sm">
                  <img 
                    src={libro.imagen || Libros} 
                    className="card-img-top" 
                    alt={libro.titulo} 
                    style={{ height: '300px', objectFit: 'cover' }} 
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{libro.titulo}</h5>
                    <p className="card-text text-muted small mt-auto">
                      {libro.autor.nombre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Catalogo;