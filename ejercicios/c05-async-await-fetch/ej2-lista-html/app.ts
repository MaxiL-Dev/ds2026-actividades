import {obtenerUsuarios} from "./api.js";
import {Usuario} from "./api.js";

const listadoUsuarios = document.getElementById('usuarios') as HTMLUListElement;
const errorP = document.getElementById('error') as HTMLParagraphElement;
const cargando = document.getElementById('cargando') as HTMLParagraphElement;

const crearUsuarioHTML = (usuario: Usuario): HTMLElement => {

    const usuarioHTML = document.createElement('li');

    let nombre = document.createElement ('h3');
    nombre.textContent = usuario.name;
    let mail = document.createElement ('p');
    mail.textContent = `mail: ${usuario.email}`;

    usuarioHTML.appendChild(nombre);
    usuarioHTML.appendChild(mail);

    return usuarioHTML;
}

export const renderizarUsuarios = (usuarios: Usuario[]): void => {

    if (usuarios.length !== 0){
        for(const usuario of usuarios){
            listadoUsuarios.appendChild(crearUsuarioHTML(usuario));
        }
    }
} 

const mostrarCargando = (): void => {

    cargando.style.display = 'block';
}

const ocultarCargando = (): void => {

    cargando.style.display = 'none';
}

try {
    mostrarCargando();

    const usuarios = await obtenerUsuarios();
    renderizarUsuarios (usuarios);
} 
catch (error) {
    errorP.innerText = `${error}`;
}
finally {
    ocultarCargando();
}