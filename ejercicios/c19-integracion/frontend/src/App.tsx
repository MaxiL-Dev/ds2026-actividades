import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './assets/App.css';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Catalogo from './pages/Catalogo.tsx';
import DetalleLibro from './pages/DetalleLibro.tsx';
import Autores from './pages/Autores.tsx';
import Categorias from './pages/Categorias.tsx';
import Login from './pages/Login.tsx';
import { useAuth } from './context/AuthContext';

function App() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!usuario) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libro/:id" element={<DetalleLibro />} />
        <Route path="/autores" element={<Autores />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;