import { obtenerUsuarios } from "./api.js";
const listadoUsuarios = document.getElementById('usuarios');
const errorP = document.getElementById('error');
const cargando = document.getElementById('cargando');
const crearUsuarioHTML = (usuario) => {
    const usuarioHTML = document.createElement('li');
    let nombre = document.createElement('h3');
    nombre.textContent = usuario.name;
    let mail = document.createElement('p');
    mail.textContent = `mail: ${usuario.email}`;
    usuarioHTML.appendChild(nombre);
    usuarioHTML.appendChild(mail);
    return usuarioHTML;
};
export const renderizarUsuarios = (usuarios) => {
    if (usuarios.length !== 0) {
        for (const usuario of usuarios) {
            listadoUsuarios.appendChild(crearUsuarioHTML(usuario));
        }
    }
};
const mostrarCargando = () => {
    cargando.style.display = 'block';
};
const ocultarCargando = () => {
    cargando.style.display = 'none';
};
try {
    mostrarCargando();
    const usuarios = await obtenerUsuarios();
    renderizarUsuarios(usuarios);
}
catch (error) {
    errorP.innerText = `${error}`;
}
finally {
    ocultarCargando();
}
