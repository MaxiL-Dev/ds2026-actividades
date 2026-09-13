import { useParams, Link } from 'react-router-dom';
import { librosDestacados } from '../types/libro.ts';

function LibroDetalle() {
  const { id } = useParams();
  const libro = librosDestacados.find((l) => l.id === Number(id));

  if (!libro) {
    return (
      <div className="container mt-5 text-center">
        <h2 style={{ color: '#fff2ba' }}>Libro no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Botón Volver mejorado */}
      <div className="mb-4">
        <Link 
          to="/" 
          className="btn d-inline-flex align-items-center gap-2" 
          style={{ backgroundColor: '#fff7d4', color: '#2b2b26', fontWeight: 'bold', border: 'none' }}
        >
          <i className="bi bi-arrow-left"></i> Volver al inicio
        </Link>
      </div>

      {/* Tarjeta envolvente (Card) */}
      <div className="card shadow-lg" style={{ backgroundColor: '#fff7d4', border: 'none', borderRadius: '15px', overflow: 'hidden' }}>
        <div className="row g-0 align-items-stretch">
          
          {/* Columna Izquierda: Imagen (con un fondo sutilmente más oscuro para contrastar) */}
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center p-4 p-md-5" style={{ backgroundColor: '#f2e8be' }}>
            <img 
              src={libro.img} 
              alt={libro.titulo} 
              className="img-fluid rounded shadow" 
              style={{ maxHeight: '450px', objectFit: 'cover' }} 
            />
          </div>
          
          {/* Columna Derecha: Contenido y detalles */}
          <div className="col-12 col-md-8">
            <div className="card-body d-flex flex-column h-100 p-4 p-md-5">
              
              <h2 className="card-title mb-1" style={{ color: '#2b2b26', fontSize: '2.5rem', fontWeight: 'bold' }}>
                {libro.titulo}
              </h2>
              <h4 className="text-muted mb-4" style={{ color: '#4a4a40' }}>
                {libro.autor}
              </h4>
              
              {/* Descripción */}
              <p className="card-text flex-grow-1" style={{ color: '#2b2b26', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {libro.descripcion}
              </p>
              
              {/* Sección de Precio y Botón de compra */}
              <div className="d-flex align-items-center justify-content-between mt-4 pt-4" style={{ borderTop: '2px solid #e8dbab' }}>
                <span className="fs-2 fw-bold" style={{ color: '#63a481' }}>
                  ${libro.precio}
                </span>
                <button className="btn btn-primary btn-lg px-5" style={{ margin: 0 }}>
                  Comprar
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LibroDetalle;