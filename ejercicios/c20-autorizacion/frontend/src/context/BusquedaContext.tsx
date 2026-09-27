import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface BusquedaContextType {
  filtro: string;
  setFiltro: (valor: string) => void;
}

const BusquedaContext = createContext<BusquedaContextType | null>(null);

export function BusquedaProvider({ children }: { children: ReactNode }) {
  const [filtro, setFiltro] = useState('');
  return (
    <BusquedaContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </BusquedaContext.Provider>
  );
}

export function useBusqueda() {
  const contexto = useContext(BusquedaContext);
  if (!contexto) {
    throw new Error('useBusqueda debe usarse dentro de <BusquedaProvider>');
  }
  return contexto;
}