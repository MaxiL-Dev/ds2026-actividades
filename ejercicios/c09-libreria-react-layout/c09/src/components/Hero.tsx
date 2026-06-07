function Hero() {
  return (
    <div className="container-fluid justify-content-center hero">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 text-center">
          <h1>Bienvenidos a la librería</h1>
        </div>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h2>Esperamos que disfrutes de nuestra selección de libros</h2>
        </div>
      </div>
      <div className="row justify-content-center text-center mt-4">
        <div className="col-12">
          <a className="btn btn-primary" href="catalogo.html">Ver catálogo</a>
        </div>
      </div>
    </div>
  );
}

export default Hero;