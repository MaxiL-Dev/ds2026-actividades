import { obtenerToken } from './sesion';

export interface DetalleValidacion {
  campo: string;
  mensaje: string;
}

export class ApiError extends Error {
  status: number;
  detalles: DetalleValidacion[];

  constructor(status: number, message: string, detalles: DetalleValidacion[] = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detalles = detalles;
  }
}

const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  const cuerpo = await res.json().catch(() => null);

  if (res.status === 401 && token) {
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      cuerpo?.error ?? `Error ${res.status}`,
      cuerpo?.detalles ?? [],
    );
  }

  return cuerpo as T;
}