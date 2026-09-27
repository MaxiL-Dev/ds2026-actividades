import { obtenerToken } from './sesion';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
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
    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}