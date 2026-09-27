import imgLibros from '../../assets/libros.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container-fluid">
        <img src={imgLibros} alt="" height="27" />
        <span className="navbar-brand">Librería</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link activo' : 'nav-link')}
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/catalogo"
                className={({ isActive }) => (isActive ? 'nav-link activo' : 'nav-link')}
              >
                catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/autores"
                className={({ isActive }) => (isActive ? 'nav-link activo' : 'nav-link')}
              >
                autores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/categorias"
                className={({ isActive }) => (isActive ? 'nav-link activo' : 'nav-link')}
              >
                categorías
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center">
            {usuario ? (
              <>
                <li className="nav-item me-3">
                  <span className="navbar-text text-light">
                    Hola, {usuario.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    onClick={cerrarSesion}
                    className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                    aria-label="Salir"
                    title="Salir"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Salir</span>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-outline-light btn-sm">
                  Ingresar
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;