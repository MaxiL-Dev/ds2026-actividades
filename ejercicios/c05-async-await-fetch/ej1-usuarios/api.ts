export interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        const usuarios: Usuario[] = data.map((usuario: Usuario) => ({
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            phone: usuario.phone
        }));
        
        return usuarios;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return[];
    }
}