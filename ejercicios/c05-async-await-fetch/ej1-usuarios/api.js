export async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        const usuarios = data.map((usuario) => ({
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            phone: usuario.phone
        }));
        return usuarios;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}
