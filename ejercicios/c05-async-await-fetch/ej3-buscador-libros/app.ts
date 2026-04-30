import {LibroOL} from './interface.js';
import {obtenerLibros} from './api.js';

const input = document.getElementById('input') as HTMLInputElement;
const boton = document.getElementById('boton') as HTMLButtonElement;
const resultados = document.getElementById('resultados') as HTMLDivElement;
const error = document.getElementById('error') as HTMLParagraphElement;

const validarInput = () => {
    if (input.value.trim() === '') {
        return false;
    }
    return true;
}

const crearElementoLibro = (libro: LibroOL): HTMLElement => {
    const libroHTML = document.createElement('div');
    libroHTML.classList.add('libro');

    const titulo = document.createElement('h3');
    if (libro.title) {
        titulo.textContent = libro.title;
    } else {
        titulo.textContent = 'Título desconocido';
    }
    const autor = document.createElement('p');
    if (libro.author_name) {
        autor.textContent = `Autor: ${libro.author_name.join(', ')}`;
    } else {
        autor.textContent = 'Autor desconocido';
    }
    const año = document.createElement('p');
    if (libro.first_publish_year) {
        año.textContent = `Año de publicación: ${libro.first_publish_year}`;
    } else {
        año.textContent = 'Año de publicación desconocido';
    }

    libroHTML.appendChild(titulo);
    libroHTML.appendChild(autor);
    libroHTML.appendChild(año);
    return libroHTML;
}

const mostrarLibros = async () => {
    if (!validarInput()) {
        error.textContent = 'Por favor, ingresa un término de búsqueda válido.';
        return;
    }
    error.textContent = '';
    resultados.innerHTML = 'Cargando...';
    try {
        const libros = await obtenerLibros(input.value);
        resultados.innerHTML = '';
        if (libros.length === 0) {
            resultados.textContent = 'No se encontraron libros para esa búsqueda.';
            return;
        }
        for (const libro of libros) {
            resultados.appendChild(crearElementoLibro(libro));
        }
    } catch (err) {
        resultados.innerHTML = '';
        error.textContent = `Error al obtener los libros: ${err}`;
    }
}

boton.addEventListener('click', mostrarLibros);

