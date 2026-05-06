import { obtenerLibros } from './api.js';
const input = document.getElementById('input');
const boton = document.getElementById('boton');
const resultados = document.getElementById('resultados');
const error = document.getElementById('error');


const validarInput = () => {
    if (input.value.trim() === '') {
        return false;
    }
    return true;
};

const crearElementoLibro = (libro) => {
    const libroHTML = document.createElement('div');
    libroHTML.classList.add('col-12');
    libroHTML.classList.add('col-sm-6');
    libroHTML.classList.add('col-md-4');
    libroHTML.classList.add('col-lg-3');
    libroHTML.classList.add('mt-4');

    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('libro-card');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = `${libro.image}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerText = `${libro.title}`;

    const text = document.createElement('p');
    text.classList.add('card-text');
    text.innerText = `${libro.author_name}`;

    cardBody.appendChild(title);
    cardBody.appendChild(text);

    card.appendChild(img);
    card.appendChild(cardBody);

    libroHTML.appendChild(card);

    return libroHTML;
}

const mostrarLibros = async () => {
    if (!validarInput()) {
        error.textContent = 'Por favor, ingresa un término de búsqueda válido.';
        return;
    }
    error.textContent = '';
    resultados.innerHTML = '<p class="text-center w-100 cargando">Cargando...</p>';
    try {
        const libros = await obtenerLibros(input.value);
        resultados.innerHTML = '';
        if (libros.length === 0) {
            error.textContent = 'No se encontraron libros para esa búsqueda.';
            return;
        }
        for (const libro of libros) {
            resultados.appendChild(crearElementoLibro(libro));
        }
    }
    catch (err) {
        resultados.innerHTML = '';
        error.textContent = `Error al obtener los libros: ${err}`;
    }
};

boton.addEventListener('click', mostrarLibros);
