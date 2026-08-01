import imgLibros from "../../assets/libros.png";
import { NavLink } from 'react-router-dom'; // 1. Importamos NavLink

function Navbar() {
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
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* 2. Usamos NavLink y configuramos className dinámicamente */}
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link activo" : "nav-link"}
              >
                home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/catalogo" 
                className={({ isActive }) => isActive ? "nav-link activo" : "nav-link"}
              >
                catálogo
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;