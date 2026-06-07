import { useState } from 'react';
import Libros from '../assets/libros.png';


export interface LibroApi {
  key: string;
  title: string;
  author_name: string[];
  image: string;
}

function Catalogo() {
  const [busqueda, setBusqueda] = useState(''); 
  const [libros, setLibros] = useState<LibroApi[]>([]); 
  const [cargando, setCargando] = useState(false); 
  const [error, setError] = useState(''); 

  const obtenerLibros = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!busqueda.trim()) return;

    setCargando(true);
    setError('');
    setLibros([]); 

    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}&limit=12`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      const resultados = data.docs.map((libro: any, index: number) => ({
        key: libro.key || index.toString(),
        title: libro.title,
        author_name: libro.author_name || ['Autor desconocido'],
        image: libro.cover_i
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : Libros 
      }));

      setLibros(resultados);
    } catch (error) {
      setError('Ocurrió un error al buscar los libros. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className="container-fluid justify-content-center mt-4">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-9 col-lg-7">
            <h2 id="titulo-catalogo" style={{ color: '#fff2ba' }}>Buscador de Libros</h2>
          </div>
        </div>
        
        <div className="row justify-content-center text-center mt-3">
          <div className="col-12 col-md-9 col-lg-7">
            <form onSubmit={obtenerLibros} className="d-flex gap-2 justify-content-center">
              <input 
                type="text" 
                className="form-control w-50 input-buscador"
                placeholder="Buscar libros (ej: Harry Potter)..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                />
              <button type="submit" className="btn btn-primary mt-0 w-auto">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid cards-section mt-4 mb-5">
        {cargando && <p className="text-center text-light">Buscando en la biblioteca...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row justify-content-center g-4">
          {libros.map((libro) => (
            <div key={libro.key} className="col-12 col-sm-8 col-md-4 col-lg-3">
              <div className="card libro-card">
                <img src={libro.image} className="card-img-top" alt={libro.title} style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{libro.title}</h5>
                  <p className="card-text text-muted">{libro.author_name.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Catalogo;