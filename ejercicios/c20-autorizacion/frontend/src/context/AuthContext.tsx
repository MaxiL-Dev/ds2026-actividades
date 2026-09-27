import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion';
import type { Usuario, Credenciales, Rol, Sesion } from '../types/sesionType';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  useEffect(() => {
    if (!obtenerToken()) return;

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => {
        borrarToken();
        setUsuario(null);
      })
      .finally(() => setCargando(false));
  }, []);

  const login = async (credenciales: Credenciales) => {
    const data = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    guardarToken(data.token);
    setUsuario(data.usuario);
  };

  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: usuario !== null,
        tieneRol: (rol: Rol) => usuario?.rol === rol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return contexto;
}