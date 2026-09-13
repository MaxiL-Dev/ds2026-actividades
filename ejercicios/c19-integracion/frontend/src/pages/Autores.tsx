import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Autor } from '../types/api';
import { listarAutores, crearAutor, actualizarAutor, eliminarAutor } from '../services/autores';
import ConfirmarModal from '../components/ConfirmarModal';

interface FormularioAutor {
  nombre: string;
  nacionalidad: string;
}

const autorVacio: FormularioAutor = { nombre: '', nacionalidad: '' };

function Autores() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === 'ADMIN';

  const [autores, setAutores] = useState<Autor[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState<Autor | null>(null);
  const [form, setForm] = useState<FormularioAutor>(autorVacio);
  const [guardando, setGuardando] = useState(false);

  const [autorAEliminar, setAutorAEliminar] = useState<Autor | null>(null);
  const [eliminando, setEliminando] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setAutores(await listarAutores());
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
    setForm(autorVacio);
    setMostrarModal(true);
  };

  const abrirEditar = (autor: Autor) => {
    setEditando(autor);
    setForm({ nombre: autor.nombre, nacionalidad: autor.nacionalidad });
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
        await actualizarAutor(editando.id, form);
      } else {
        await crearAutor(form);
      }
      setMostrarModal(false);
      await cargar();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const abrirEliminar = (autor: Autor) => {
    setError(null);

    if (!esAdmin) {
      setError('No tenés permiso para esta operación');
      return;
    }

    setAutorAEliminar(autor);
  };

  const confirmarEliminacion = async () => {
    if (!autorAEliminar) return;

    setEliminando(true);
    setError(null);

    try {
      await eliminarAutor(autorAEliminar.id);
      setAutorAEliminar(null);
      await cargar();
    } catch (err: any) {
      setError(err.message);
      setAutorAEliminar(null);
    } finally {
      setEliminando(false);
    }
  };

  const cerrarEliminar = () => setAutorAEliminar(null);

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '800px' }}>
      <div className="hero shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0" style={{ fontWeight: 'bold' }}>Gestión de Autores</h2>
          <Button
            variant="primary"
            onClick={abrirCrear}
            className="d-inline-flex align-items-center gap-2"
            style={{ marginTop: 0, width: 'auto' }}
          >
            <i className="bi bi-plus-circle"></i> Nuevo Autor
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {cargando && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p style={{ color: '#4a4a40' }} className="mt-2">Cargando autores...</p>
          </div>
        )}

        {!cargando && autores.length === 0 && !error && (
          <p className="text-center" style={{ color: '#4a4a40' }}>
            No hay autores registrados.
          </p>
        )}

        {!cargando && autores.length > 0 && (
          <Table responsive className="tabla-autores">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nacionalidad</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {autores.map((autor) => (
                <tr key={autor.id}>
                  <td>{autor.nombre}</td>
                  <td>{autor.nacionalidad}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn-editar me-2"
                      onClick={() => abrirEditar(autor)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-eliminar"
                      onClick={() => abrirEliminar(autor)}
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
            <Modal.Title>{editando ? 'Editar Autor' : 'Nuevo Autor'}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#fff7d4' }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Nombre*</Form.Label>
              <Form.Control
                className="input-buscador"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                placeholder="Ej: Jorge Luis Borges"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Nacionalidad*</Form.Label>
              <Form.Control
                className="input-buscador"
                value={form.nacionalidad}
                onChange={(e) => setForm({ ...form, nacionalidad: e.target.value })}
                required
                placeholder="Ej: Argentina"
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
        show={!!autorAEliminar}
        titulo="Eliminar Autor"
        mensaje={autorAEliminar ? `¿Seguro que querés eliminar al autor "${autorAEliminar.nombre}"?` : ''}
        confirmarTexto="Eliminar"
        confirmando={eliminando}
        onConfirm={confirmarEliminacion}
        onCancel={cerrarEliminar}
      />
    </div>
  );
}

export default Autores;