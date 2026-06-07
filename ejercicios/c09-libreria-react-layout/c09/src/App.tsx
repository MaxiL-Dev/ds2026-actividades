import { Routes, Route} from 'react-router-dom';
import './assets/App.css'
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';
import Catalogo from './pages/Catalogo.tsx';
import DetalleLibro from './pages/DetalleLibro.tsx';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalogo" element={<Catalogo/>} />
        <Route path="/libro/:id" element={<DetalleLibro/>} />
      </Routes>
    </Layout>
  )
}

export default App
