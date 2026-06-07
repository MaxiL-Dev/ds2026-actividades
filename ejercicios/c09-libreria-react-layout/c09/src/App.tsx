import { Routes, Route} from 'react-router-dom';
import './assets/App.css'
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Layout>
  )
}

export default App
