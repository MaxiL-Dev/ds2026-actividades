import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Libros from './pages/Catalogo';
import Login from './pages/Login';
import SinPermiso from './pages/SinPermiso';
import Autores from './pages/Autores';
import Categorias from './pages/Categorias';
import LibroDetalle from './pages/DetalleLibro';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BusquedaProvider } from './context/BusquedaContext'; 
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <AuthProvider>
    <BusquedaProvider>    
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          <Route path="/libro/:id" element={<LibroDetalle />} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/autores" element={<Autores />} />
            <Route path="/categorias" element={<Categorias />} />
          </Route>
          <Route path="*" element={<Navigate to="/catalogo" replace />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
    </AuthProvider>
  );
}

export default App;