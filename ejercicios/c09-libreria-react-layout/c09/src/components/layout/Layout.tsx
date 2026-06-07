import Footer from './Footer.tsx';
import Navbar from './Navbar.tsx';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout;