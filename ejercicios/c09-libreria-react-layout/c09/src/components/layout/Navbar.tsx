import imgLibros from "../../assets/libros.png";

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
              <a className="nav-link activo" aria-current="page" href="#">home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./catalogo.html">catálogo</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;