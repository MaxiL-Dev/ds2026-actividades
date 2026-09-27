import { apiFetch } from './api';
import type { Categoria } from '../types/libroType';

export const listarCategorias = () => apiFetch<Categoria[]>('/categorias');

export const crearCategoria = (datos: Omit<Categoria, 'id'>) =>
  apiFetch<Categoria>('/categorias', { method: 'POST', body: JSON.stringify(datos) });

export const actualizarCategoria = (id: number, datos: Omit<Categoria, 'id'>) =>
  apiFetch<Categoria>(`/categorias/${id}`, { method: 'PUT', body: JSON.stringify(datos) });

export const eliminarCategoria = (id: number) =>
  apiFetch<void>(`/categorias/${id}`, { method: 'DELETE' });