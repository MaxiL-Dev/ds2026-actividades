import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from 'react-bootstrap';
import { type LibroApi } from './Catalogo'; 

const libroSchema = z.object({
  title: z.string().trim().min(1, 'El título es obligatorio'),
  author_name: z.string().trim().min(1, 'El autor es obligatorio'),
  image: z.string().url('Debe ser una URL válida').or(z.literal('')),
});

type FormularioLibro = z.infer<typeof libroSchema>;

interface LibroNuevoProps {
  onAgregar: (libro: LibroApi) => void;
}

function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormularioLibro>({ 
    resolver: zodResolver(libroSchema) 
  });

  const onSubmit = (data: FormularioLibro) => {
    const nuevoLibro: LibroApi = {
      key: Date.now().toString(), 
      title: data.title,
      author_name: [data.author_name], 
      image: data.image
    };

    onAgregar(nuevoLibro); 
    navigate('/catalogo'); 
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '600px' }}>
      <div className="hero shadow-sm">
        <h2 className="mb-4 text-center" style={{ fontWeight: 'bold' }}>
          Agregar Nuevo Libro
        </h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Título*</Form.Label>
            <Form.Control 
              className="input-buscador"
              {...register('title')} 
              isInvalid={!!errors.title} 
              placeholder="Ej: El Aleph"
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>Autor*</Form.Label>
            <Form.Control 
              className="input-buscador"
              {...register('author_name')} 
              isInvalid={!!errors.author_name} 
              placeholder="Ej: Jorge Luis Borges"
            />
            <Form.Control.Feedback type="invalid">
              {errors.author_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: '#4a4a40', fontWeight: 'bold' }}>URL de la Portada (Opcional)</Form.Label>
            <Form.Control 
              className="input-buscador"
              {...register('image')} 
              isInvalid={!!errors.image} 
              placeholder="https://ejemplo.com/portada.jpg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.image?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-center mt-4">
            <button type="submit" className="btn-primary w-100 py-2">
              Guardar Libro
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LibroNuevo;