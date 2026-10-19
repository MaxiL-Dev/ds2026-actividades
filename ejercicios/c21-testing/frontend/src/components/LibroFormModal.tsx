import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal, Form, Alert, Spinner, Button } from 'react-bootstrap';
import type { Autor, Categoria, LibroApi } from '../types/libroType';
import { listarAutores } from '../services/autores';
import { listarCategorias } from '../services/categorias';
import { crearLibro, actualizarLibro } from '../services/libros';
import { ApiError } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Combobox from './Combobox';

const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  precio: z.number().int().positive('El precio debe ser mayor a 0'),
  imagen: z.string().url('Debe ser una URL válida').or(z.literal('')),
});

type FormularioLibro = z.infer<typeof libroSchema>;

const CAMPOS_DEL_FORMULARIO = ['titulo', 'precio', 'imagen'] as const;

interface LibroFormModalProps {
  show: boolean;
  libro?: LibroApi | null;
  onClose: () => void;
  onGuardado: () => void;
}

function LibroFormModal({ show, libro = null, onClose, onGuardado }: LibroFormModalProps) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === 'ADMIN';

  const {
    register,
    handleSubmit,
    reset,
    setError: setErrorCampo,
    formState: { errors },
  } = useForm<FormularioLibro>({
    resolver: zodResolver(libroSchema)
  });

  const [autores, setAutores] = useState<Autor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [autorId, setAutorId] = useState<number | null>(null);
  const [autorError, setAutorError] = useState<string | null>(null);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);
  const [categoriasError, setCategoriasError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!show) return;

    setError(null);
    setAutorError(null);
    setCategoriasError(null);
    setAutorId(libro?.autor.id ?? null);
    setCategoriasSeleccionadas(libro?.categorias.map((c) => c.id) ?? []);
    reset({
      titulo: libro?.titulo ?? '',
      precio: libro?.precio ?? NaN,
      imagen: libro?.imagen ?? '',
    });

    listarAutores()
      .then(setAutores)
      .catch(() => setAutores([]));

    listarCategorias()
      .then(setCategorias)
      .catch(() => setCategorias([]));
  }, [show, libro, reset]);

  const opcionesAutores = autores.map((a) => ({ id: a.id, etiqueta: a.nombre }));
  const opcionesCategorias = categorias.map((c) => ({ id: c.id, etiqueta: c.nombre }));

  const onSubmit = async (data: FormularioLibro) => {
    setError(null);

    if (!autorId) {
      setAutorError('Debes elegir un autor');
      return;
    }

    if (!esAdmin) {
      setError('No tenés permiso para esta operación');
      return;
    }

    setGuardando(true);

    const datos = {
      titulo: data.titulo,
      precio: data.precio,
      imagen: data.imagen,
      disponible: libro?.disponible ?? true,
      autorId,
      categoriasIds: libro
        ? categoriasSeleccionadas
        : (categoriasSeleccionadas.length > 0 ? categoriasSeleccionadas : undefined),
    };

    try {
      if (libro) {
        await actualizarLibro(libro.id, datos);
      } else {
        await crearLibro(datos);
      }
      onGuardado();
      onClose();
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 403) {
          navigate('/sin-permiso', { replace: true });
          return;
        }

        if (err.status === 400) {
          const sinCampo: string[] = [];

          for (const { campo, mensaje } of err.detalles) {
            if ((CAMPOS_DEL_FORMULARIO as readonly string[]).includes(campo)) {
              setErrorCampo(campo as keyof FormularioLibro, { message: mensaje });
            } else if (campo === 'autorId') {
              setAutorError(mensaje);
            } else if (campo === 'categoriasIds') {
              setCategoriasError(mensaje);
            } else {
              sinCampo.push(mensaje);
            }
          }

          setError(
            sinCampo.length > 0
              ? `Revisá los datos ingresados: ${sinCampo.join(' ')}`
              : 'Revisá los campos marcados en el formulario.'
          );
          return;
        }

        setError('Error del servidor. Intentá de nuevo en unos minutos.');
        return;
      }

      setError('No pudimos conectar con el servidor. Revisá tu conexión.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#63a481', color: '#fff2ba', borderBottom: '1px solid #4e8a6a' }}
        >
          <Modal.Title className="d-flex align-items-center gap-2">
            <i className={`bi ${libro ? 'bi-pencil' : 'bi-plus-circle'}`}></i>{' '}
            {libro ? 'Editar Libro' : 'Agregar Nuevo Libro'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#fff7d4' }}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Título*</Form.Label>
            <Form.Control
              className="input-buscador"
              {...register('titulo')}
              isInvalid={!!errors.titulo}
              placeholder="Ej: El Aleph"
            />
            <Form.Control.Feedback type="invalid">
              {errors.titulo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="mb-3">
            <Combobox
              opciones={opcionesAutores}
              etiqueta="Autor*"
              placeholder="Buscá un autor..."
              valor={autorId ? [autorId] : []}
              onChange={(ids) => {
                setAutorId(ids[0] ?? null);
                setAutorError(null);
              }}
              invalid={!!autorError}
              error={autorError ?? undefined}
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Precio*</Form.Label>
            <Form.Control
              className="input-buscador"
              type="number"
              {...register('precio', { valueAsNumber: true })}
              isInvalid={!!errors.precio}
              placeholder="Ej: 15000"
            />
            <Form.Control.Feedback type="invalid">
              {errors.precio?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="mb-3">
            <Combobox
              multi
              opciones={opcionesCategorias}
              etiqueta="Categorías"
              placeholder="Buscá categorías..."
              valor={categoriasSeleccionadas}
              onChange={(ids) => {
                setCategoriasSeleccionadas(ids);
                setCategoriasError(null);
              }}
              invalid={!!categoriasError}
              error={categoriasError ?? undefined}
            />
          </div>

          <Form.Group className="mb-1">
            <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>URL de la Portada (Opcional)</Form.Label>
            <Form.Control
              className="input-buscador"
              {...register('imagen')}
              isInvalid={!!errors.imagen}
              placeholder="https://ejemplo.com/portada.jpg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagen?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#fff7d4', borderTop: '1px solid #e8dbab' }}>
          <Button variant="secondary" onClick={onClose} style={{ marginTop: 0 }}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" style={{ marginTop: 0, width: 'auto' }} disabled={guardando}>
            {guardando ? <Spinner size="sm" /> : 'Guardar Libro'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default LibroFormModal;