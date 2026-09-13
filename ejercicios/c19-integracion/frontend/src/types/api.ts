export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface LibroApi {
  id: number;
  titulo: string;
  autor: Autor;
  categorias: Categoria[];
  imagen: string;
  precio: number;
  disponible: boolean;
}

export type Rol = 'ADMIN' | 'CLIENTE';

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}