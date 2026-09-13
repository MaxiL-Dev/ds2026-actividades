import { apiFetch } from './api';
import type { Autor } from '../types/api';

export const listarAutores = () => apiFetch<Autor[]>('/autores');

export const crearAutor = (datos: Omit<Autor, 'id'>) =>
  apiFetch<Autor>('/autores', { method: 'POST', body: JSON.stringify(datos) });

export const actualizarAutor = (id: number, datos: Omit<Autor, 'id'>) =>
  apiFetch<Autor>(`/autores/${id}`, { method: 'PUT', body: JSON.stringify(datos) });

export const eliminarAutor = (id: number) =>
  apiFetch<{ mensaje?: string }>(`/autores/${id}`, { method: 'DELETE' });