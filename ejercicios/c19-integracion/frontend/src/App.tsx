import { Routes, Route } from 'react-router-dom';
import './assets/App.css';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';
// Ojo: Ya no necesitamos importar { type LibroApi } acá
import Catalogo from './pages/Catalogo.tsx'; 
import DetalleLibro from './pages/DetalleLibro.tsx';
import LibroNuevo from './pages/LibroNuevo.tsx'; 

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libro/:id" element={<DetalleLibro/>} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={() => {}} />} />
      </Routes>
    </Layout>
  )
}

export default App;