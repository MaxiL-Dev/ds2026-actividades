import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import { guardarToken, obtenerToken, borrarToken } from '../services/sesion';
import type { Usuario } from '../types/api';

interface AuthContextValue {
  usuario: Usuario | null;
  cargando: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  esAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const validarSesion = async () => {
      const token = obtenerToken();
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const u = await apiFetch<Usuario>('/auth/yo');
        setUsuario(u);
      } catch {
        borrarToken();
      } finally {
        setCargando(false);
      }
    };

    validarSesion();
  }, []);

  const login = async (email: string, password: string) => {
    const sesion = await apiFetch<{ token: string; usuario: Usuario }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  const esAdmin = () => usuario?.rol === 'ADMIN';

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, esAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}