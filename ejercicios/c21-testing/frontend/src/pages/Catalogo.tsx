import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import Libros from '../assets/libros.png';
import type { LibroApi } from '../types/libroType';
import { listarLibros, eliminarLibro } from '../services/libros';
import { ApiError } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LibroFormModal from '../components/LibroFormModal';
import ConfirmarModal from '../components/ConfirmarModal';

function Catalogo() {
  const { tieneRol } = useAuth();
  const navigate = useNavigate();
  const esAdmin = tieneRol('ADMIN');

  const [libros, setLibros] = useState<LibroApi[] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accionError, setAccionError] = useState<string | null>(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroAEditar, setLibroAEditar] = useState<LibroApi | null>(null);
  const [libroAEliminar, setLibroAEliminar] = useState<LibroApi | null>(null);
  const [eliminando, setEliminando] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setLibros(await listarLibros());
      setError(null);
    } catch (err: unknown) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'No pudimos cargar el catálogo. Revisá tu conexión.',
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const abrirCrear = () => {
    setLibroAEditar(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (libro: LibroApi) => {
    setAccionError(null);

    if (!esAdmin) {
      setAccionError('No tenés permiso para esta operación');
      return;
    }

    setLibroAEditar(libro);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setLibroAEditar(null);
  };

  const abrirEliminar = (libro: LibroApi) => {
    setAccionError(null);

    if (!esAdmin) {
      setAccionError('No tenés permiso para esta operación');
      return;
    }

    setLibroAEliminar(libro);
  };

  const confirmarEliminacion = async () => {
    if (!libroAEliminar) return;

    setEliminando(true);
    setAccionError(null);

    try {
      await eliminarLibro(libroAEliminar.id);
      setLibroAEliminar(null);
      await cargar();
    } catch (err: unknown) {
      setLibroAEliminar(null);

      if (err instanceof ApiError) {
        if (err.status === 403) {
          navigate('/sin-permiso', { replace: true });
          return;
        }

        if (err.status === 409) {
          setAccionError('No se puede eliminar: el libro tiene registros relacionados.');
          return;
        }

        if (err.status === 404) {
          setAccionError('El libro ya no existe.');
          await cargar();
          return;
        }

        setAccionError('Error del servidor. Intentá de nuevo en unos minutos.');
        return;
      }

      setAccionError('No pudimos conectar con el servidor. Revisá tu conexión.');
    } finally {
      setEliminando(false);
    }
  };

  const cerrarEliminar = () => setLibroAEliminar(null);

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 d-flex justify-content-between align-items-center border-bottom pb-3">
            <h2 id="titulo-catalogo" style={{ color: '#fff2ba' }} className="m-0">
              Catálogo de Libros
            </h2>
            {esAdmin && (
              <button
                type="button"
                onClick={abrirCrear}
                className="btn-primary text-decoration-none d-inline-flex align-items-center justify-content-center gap-2"
                style={{ width: 'auto', marginTop: 0, border: 'none' }}
              >
                <i className="bi bi-plus-circle"></i> Agregar Libro
              </button>
            )}
          </div>
        </div>
      </div>

      {accionError && (
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <Alert variant="danger" dismissible onClose={() => setAccionError(null)}>
                {accionError}
              </Alert>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid cards-section mt-4 mb-5">
        {cargando && (
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

        {!cargando && !error && (!libros || libros.length === 0) && (
          <p className="text-center text-light mt-5">
            No hay libros en el catálogo.
          </p>
        )}

        {!cargando && !error && libros && (
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
                    {libro.categorias.length > 0 && (
                      <div className="mb-2">
                        {libro.categorias.map((categoria) => (
                          <span key={categoria.id} className="badge categoria-badge me-1">
                            {categoria.nombre}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="card-text text-muted small mt-auto">{libro.autor.nombre}</p>
                    {esAdmin && (
                      <div className="d-flex justify-content-end gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => abrirEditar(libro)}
                          className="btn-editar-libro"
                          aria-label={`Editar ${libro.titulo}`}
                          title="Editar libro"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => abrirEliminar(libro)}
                          className="btn-eliminar-libro"
                          aria-label={`Eliminar ${libro.titulo}`}
                          title="Eliminar libro"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LibroFormModal
        show={mostrarFormulario}
        libro={libroAEditar}
        onClose={cerrarFormulario}
        onGuardado={cargar}
      />

      <ConfirmarModal
        show={!!libroAEliminar}
        titulo="Eliminar Libro"
        mensaje={libroAEliminar ? `¿Seguro que querés eliminar "${libroAEliminar.titulo}"?` : ''}
        confirmarTexto="Eliminar"
        confirmando={eliminando}
        onConfirm={confirmarEliminacion}
        onCancel={cerrarEliminar}
      />
    </>
  );
}

export default Catalogo;