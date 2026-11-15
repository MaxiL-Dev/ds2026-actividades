import { apiFetch } from './api';
import type { LibroApi } from '../types/libroType';

export interface DatosLibro {
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autorId: number;
  categoriasIds?: number[];
}

export const listarLibros = () => apiFetch<LibroApi[]>('/libros');

export const crearLibro = (datos: DatosLibro) =>
  apiFetch<LibroApi>('/libros', { method: 'POST', body: JSON.stringify(datos) });

export const actualizarLibro = (id: number, datos: DatosLibro) =>
  apiFetch<LibroApi>(`/libros/${id}`, { method: 'PUT', body: JSON.stringify(datos) });

export const eliminarLibro = (id: number) =>
  apiFetch<void>(`/libros/${id}`, { method: 'DELETE' });