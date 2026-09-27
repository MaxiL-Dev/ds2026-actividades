import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Libros from './pages/Catalogo';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { BusquedaProvider } from './context/BusquedaContext'; 
import { AuthProvider } from './context/AuthContext';

function App() {
  
  return (
    <AuthProvider>
    <BusquedaProvider>    
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
    </AuthProvider>
  );
}

export default App;