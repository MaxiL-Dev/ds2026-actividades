import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Navbar";
import { AuthContext } from "../../context/AuthContext";
import type { Usuario, Rol } from "../../types/sesionType";

type AuthContextValue = NonNullable<React.ComponentProps<typeof AuthContext.Provider>["value"]>;

function renderHeader(usuario: Usuario | null = null) {
  const authValue: AuthContextValue = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("Componente Header / Navbar", () => {
  it("Escenario 1: Usuario no autenticado (null) ve la opción de ingresar y no ve opciones de administración", () => {
    renderHeader(null);

    // Debe mostrar la opción de ingresar apuntando a /login
    const linkIngresar = screen.getByRole("link", { name: /ingresar/i });
    expect(linkIngresar).toBeInTheDocument();
    expect(linkIngresar).toHaveAttribute("href", "/login");

    // NO debe mostrar opciones de administración ni botones de creación
    expect(screen.queryByRole("link", { name: /autores/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /categorías/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/crear libro|agregar libro/i)).not.toBeInTheDocument();

    // NO debe mostrar saludo ni botón de salir
    expect(screen.queryByText(/hola,/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /salir/i })).not.toBeInTheDocument();
  });

  it("Escenario 2: Usuario con rol CLIENTE saluda al usuario y NO muestra el enlace/botón de crear libro ni administración", () => {
    const usuarioCliente: Usuario = {
      id: 2,
      nombre: "Carlos Gómez",
      email: "cliente@libreria.test",
      rol: "CLIENTE",
    };

    renderHeader(usuarioCliente);

    // Saluda al usuario y muestra botón de salir
    expect(screen.getByText("Hola, Carlos Gómez")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();

    // NO debe mostrar el enlace de ingresar
    expect(screen.queryByRole("link", { name: /ingresar/i })).not.toBeInTheDocument();

    // NO muestra el enlace/botón de crear libro ni rutas administrativas
    expect(screen.queryByText(/crear libro|agregar libro/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /autores/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /categorías/i })).not.toBeInTheDocument();
  });

  it("Escenario 3: Usuario con rol ADMIN muestra los enlaces de administración con getByRole", () => {
    const usuarioAdmin: Usuario = {
      id: 1,
      nombre: "Administrador",
      email: "admin@libreria.test",
      rol: "ADMIN",
    };

    renderHeader(usuarioAdmin);

    // Saluda al admin
    expect(screen.getByText("Hola, Administrador")).toBeInTheDocument();

    // Muestra los enlaces de administración
    const linkAutores = screen.getByRole("link", { name: /autores/i });
    const linkCategorias = screen.getByRole("link", { name: /categorías/i });

    expect(linkAutores).toBeInTheDocument();
    expect(linkAutores).toHaveAttribute("href", "/autores");
    expect(linkCategorias).toBeInTheDocument();
    expect(linkCategorias).toHaveAttribute("href", "/categorias");
  });
});
