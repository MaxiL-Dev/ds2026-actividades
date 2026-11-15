import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Alert variant="warning" className="shadow-sm">
        <Alert.Heading>Acceso restringido</Alert.Heading>
        <p>
          No tenés los permisos necesarios para acceder a esta sección de la aplicación.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Link to="/catalogo" className="btn btn-outline-warning">
            Volver al catálogo
          </Link>
        </div>
      </Alert>
    </Container>
  );
}

export default SinPermiso;