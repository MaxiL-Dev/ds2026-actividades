import { useState } from 'react'; 
import Hero from '../components/Hero.tsx';
import LibroCard from '../components/LibroCard.tsx';
import { librosDestacados } from '../types/libro.ts';

function Home() {

  const [libros, setLibros] = useState(librosDestacados.slice(0, 6));


  const handleLike = (id: number) => {

    setLibros((librosActuales) =>
      librosActuales.map((libro) => {

        if (libro.id === id) {
          return { ...libro, likes: libro.likes + 1 };
        }
        // Si no es el libro clicado, lo devolvemos tal cual
        return libro;
      })
    );
  };

  return (
    <>
      <Hero />
      <div className="container-fluid justify-content-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 text-center">
            <h2 id="libros-d">Libros destacados</h2>
          </div>
        </div>
      </div>
      <div className="container-fluid cards-section">
        <div className="row justify-content-center g-4">
          {libros.map((libro) => (
            <LibroCard 
              key={libro.id} 
              libro={libro} 
              onLike={handleLike} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;