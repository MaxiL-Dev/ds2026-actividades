import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import imgLibros from '../assets/libros.png';

function Login() {
  const { usuario, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (usuario) {
    return <Navigate to="/catalogo" replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-wrapper">
      <div className="card login-card shadow-lg">
        <div className="login-card-header">
          <img src={imgLibros} alt="" height={48} />
          <h1 className="login-card-titulo">Librería</h1>
          <p className="login-card-subtitulo">Ingresá para explorar tu biblioteca</p>
        </div>

        <div className="card-body">
          {error && (
            <Alert variant="danger" role="alert" aria-live="assertive">
              {error}
            </Alert>
          )}

          <form onSubmit={onSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="login-email" style={{ color: '#4a4a40', fontWeight: 'bold' }}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoFocus
                className="form-control input-buscador"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="login-password" style={{ color: '#4a4a40', fontWeight: 'bold' }}>
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                className="form-control input-buscador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary login-boton"
              disabled={loading}
              aria-busy={loading}
              aria-live="polite"
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;