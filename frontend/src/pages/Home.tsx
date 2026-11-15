import Hero from '../components/Hero.tsx';
import LibroCard from '../components/LibroCard.tsx';
import { librosDestacados } from '../types/libro.ts';

function Home() {
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
          {librosDestacados.map((libro) => (
            <LibroCard
              key={libro.id}
              libro={libro}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;