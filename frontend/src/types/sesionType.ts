export interface Sesion {
  token: string;
  usuario: Usuario;
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}

export interface Credenciales {
  email: string;
  password: string;
}

export type Rol = 'ADMIN' | 'CLIENTE';