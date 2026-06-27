import { Routes, Route} from 'react-router-dom';
import './assets/App.css'
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Catalogo, { type LibroApi } from './pages/Catalogo.tsx';
import DetalleLibro from './pages/DetalleLibro.tsx';
import LibroNuevo from './pages/LibroNuevo.tsx';    
import { useState } from 'react';


function App() {

  const [libros, setLibros] = useState<LibroApi[]>([]);
  const agregarLibro = (nuevoLibro: LibroApi) => {
    setLibros([...libros, nuevoLibro]);
  };
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libro/:id" element={<DetalleLibro/>} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  )
}

export default App
