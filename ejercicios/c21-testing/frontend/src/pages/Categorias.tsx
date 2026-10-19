import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Categoria } from '../types/libroType';
import { listarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from '../services/categorias';
import ConfirmarModal from '../components/ConfirmarModal';

function Categorias() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === 'ADMIN';

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [nombre, setNombre] = useState('');
  const [guardando, setGuardando] = useState(false);

  const [categoriaAEliminar, setCategoriaAEliminar] = useState<Categoria | null>(null);
  const [eliminando, setEliminando] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setCategorias(await listarCategorias());
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const abrirCrear = () => {
    setEditando(null);
    setNombre('');
    setMostrarModal(true);
  };

  const abrirEditar = (categoria: Categoria) => {
    setEditando(categoria);
    setNombre(categoria.nombre);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditando(null);
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!esAdmin) {
      setError('No tenés permiso para esta operación');
      return;
    }

    setGuardando(true);

    try {
      if (editando) {
        await actualizarCategoria(editando.id, { nombre });
      } else {
        await crearCategoria({ nombre });
      }
      setMostrarModal(false);
      await cargar();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const abrirEliminar = (categoria: Categoria) => {
    setError(null);

    if (!esAdmin) {
      setError('No tenés permiso para esta operación');
      return;
    }

    setCategoriaAEliminar(categoria);
  };

  const confirmarEliminacion = async () => {
    if (!categoriaAEliminar) return;

    setEliminando(true);
    setError(null);

    try {
      await eliminarCategoria(categoriaAEliminar.id);
      setCategoriaAEliminar(null);
      await cargar();
    } catch (err: any) {
      setError(err.message);
      setCategoriaAEliminar(null);
    } finally {
      setEliminando(false);
    }
  };

  const cerrarEliminar = () => setCategoriaAEliminar(null);

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '800px' }}>
      <div className="hero shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0" style={{ fontWeight: 'bold' }}>Gestión de Categorías</h2>
          <Button
            variant="primary"
            onClick={abrirCrear}
            className="d-inline-flex align-items-center gap-2"
            style={{ marginTop: 0, width: 'auto' }}
          >
            <i className="bi bi-plus-circle"></i> Nueva Categoría
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {cargando && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p style={{ color: '#4a4a40' }} className="mt-2">Cargando categorías...</p>
          </div>
        )}

        {!cargando && categorias.length === 0 && !error && (
          <p className="text-center" style={{ color: '#4a4a40' }}>
            No hay categorías registradas.
          </p>
        )}

        {!cargando && categorias.length > 0 && (
          <Table responsive className="tabla-autores">
            <thead>
              <tr>
                <th>Nombre</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.nombre}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn-editar me-2"
                      onClick={() => abrirEditar(categoria)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-eliminar"
                      onClick={() => abrirEliminar(categoria)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Form onSubmit={guardar}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: '#63a481', color: '#fff2ba', borderBottom: '1px solid #4e8a6a' }}
          >
            <Modal.Title>{editando ? 'Editar Categoría' : 'Nueva Categoría'}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#fff7d4' }}>
            <Form.Group>
              <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Nombre*</Form.Label>
              <Form.Control
                className="input-buscador"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Ej: Ficción"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#fff7d4', borderTop: '1px solid #e8dbab' }}>
            <Button variant="secondary" onClick={cerrarModal} style={{ marginTop: 0 }}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" style={{ marginTop: 0, width: 'auto' }} disabled={guardando}>
              {guardando ? <Spinner size="sm" /> : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ConfirmarModal
        show={!!categoriaAEliminar}
        titulo="Eliminar Categoría"
        mensaje={categoriaAEliminar ? `¿Seguro que querés eliminar la categoría "${categoriaAEliminar.nombre}"?` : ''}
        confirmarTexto="Eliminar"
        confirmando={eliminando}
        onConfirm={confirmarEliminacion}
        onCancel={cerrarEliminar}
      />
    </div>
  );
}

export default Categorias;