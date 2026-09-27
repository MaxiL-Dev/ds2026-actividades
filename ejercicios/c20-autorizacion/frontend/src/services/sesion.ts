export const guardarToken = (token: string) => localStorage.setItem('token', token);
export const obtenerToken = () => localStorage.getItem('token');
export const borrarToken = () => localStorage.removeItem('token');