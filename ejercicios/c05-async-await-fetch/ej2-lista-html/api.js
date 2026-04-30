export async function obtenerUsuarios() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const usuarios = data.map((usuario) => ({
        name: usuario.name,
        email: usuario.email
    }));
    return usuarios;
}
