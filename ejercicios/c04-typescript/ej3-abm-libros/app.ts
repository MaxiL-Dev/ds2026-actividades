const filtroAutor = document.getElementById('filtroAutor') as HTMLInputElement;
const listado = document.getElementById('listado') as HTMLElement;
const precioProm = document.getElementById('stats') as HTMLElement;

const erroresForm = document.getElementById('errorForm') as HTMLElement;

const agregarLibroBoton = document.getElementById('agregarLibroBoton') as HTMLButtonElement;
const tituloInput = document.getElementById('tituloInput') as HTMLInputElement;
const autorInput = document.getElementById('autorInput') as HTMLInputElement;
const precioInput = document.getElementById('precioInput') as HTMLInputElement;
const generoInput = document.getElementById('generoInput') as HTMLInputElement;
const disponibleCheckbox = document.getElementById('disponible') as HTMLInputElement;

const filtrar = document.getElementById('filtrar') as HTMLButtonElement;
const disponibles = document.getElementById('mostrarDisponibles') as HTMLButtonElement;
const todos = document.getElementById('mostrarTodos') as HTMLButtonElement;


interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero: string;
}

class LibroCl implements Libro {
    isbn: string;
    titulo: string
    autor: string;
    precio: number;
    disponible: boolean
    genero: string;

    constructor(isbn: string, titulo: string, autor: string, precio: number, disponible: boolean, genero: string) {
            this.isbn = isbn;
            this.titulo = titulo;
            this.autor = autor;
            this.precio = precio;
            this.disponible = disponible;
            this.genero = genero;
    }
}

const catalogo: LibroCl[] = [
    new LibroCl('978-0-385-12167-5', 'It', 'Stephen King', 18990, true, 'Terror'),
    new LibroCl('978-0-7434-7527-1', 'El resplandor', 'Stephen King', 14990, true, 'Terror'),
    new LibroCl('978-0-14-143955-6', 'Frankenstein', 'Mary Shelley', 11990, true, 'Terror gótico'),
    new LibroCl('978-0-19-953689-0', 'Drácula', 'Bram Stoker', 12990, true, 'Terror gótico'),
    new LibroCl('978-0-14-118776-1', 'El extraño caso del Dr. Jekyll y Mr. Hyde', 'Robert Louis Stevenson', 9990, true, 'Terror'),
    new LibroCl('978-0-452-28423-4', 'La llamada de Cthulhu', 'H. P. Lovecraft', 13990, true, 'Horror cósmico'),
    new LibroCl('978-0-06-085398-3', 'Soy leyenda', 'Richard Matheson', 10990, true, 'Terror'),
    new LibroCl('978-0-06-207348-8', 'El exorcista', 'William Peter Blatty', 13990, false, 'Terror'),
    new LibroCl('978-0-307-74530-2', 'La casa infernal', 'Richard Matheson', 12490, true, 'Terror'),
    new LibroCl('978-1-5011-8756-3', 'El instituto', 'Stephen King', 17990, true, 'Terror')
];

const buscarPorAutor = (autor: string): Libro[] => {
    return catalogo.filter(libro => libro.autor.toLowerCase() === autor.toLowerCase());
}

const librosDisponibles = (): Libro[] => {
    return catalogo.filter(libro => libro.disponible);
}

const precioPromedio = (libros: Libro[]): number => {
    let total = 0;
    for (const libro of libros) {
        total += libro.precio;
    }
    return total / libros.length;
}

const crearLibro = (libro: Libro): HTMLElement => { 
    const libroHTML = document.createElement('li');

    let titulo = document.createElement('h3');
    titulo.textContent = libro.titulo;
    let autor = document.createElement('p');
    autor.textContent = `Autor: ${libro.autor}`;
    let precio = document.createElement('p');
    precio.textContent = `Precio: ${libro.precio}$`;
    let genero = document.createElement('p');
    genero.textContent = `Género: ${libro.genero}`;
    let isbn = document.createElement('p');
    isbn.textContent = `ISBN: ${libro.isbn}`;

    if (libro.disponible) {
        libroHTML.style.borderLeftColor = '#28a745'; // Verde para disponibles
    } else {
        libroHTML.style.borderLeftColor = '#dc3545'; // Rojo para no disponibles
    }

    let eliminar = document.createElement('button');
    eliminar.textContent = 'Eliminar';
        eliminar.addEventListener('click', () => {
        const index = catalogo.findIndex(l => l.isbn === libro.isbn);
        
        catalogo.splice(index, 1);
        renderizar(catalogo);
        
    });

    libroHTML.appendChild(titulo);
    libroHTML.appendChild(autor);
    libroHTML.appendChild(precio);
    libroHTML.appendChild(genero);
    libroHTML.appendChild(isbn);
    libroHTML.appendChild(eliminar);
    return libroHTML;
}

const renderizar = (libros: Libro[]): void => {
    if (libros.length !== 0) {
        listado.innerHTML = '';
        for (const libro of libros) {
            const libroHTML = crearLibro(libro);
            listado.appendChild(libroHTML);
        }
        
        precioProm.textContent = `Precio promedio: ${precioPromedio(libros).toFixed(2)}$`;
    }

    else {
    listado.innerHTML = 'No se encontraron libros.';
    precioProm.textContent = '';
    }
    
}

const altaLibro = (): Libro => {

    let isbn = `978-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10)}`;
    let titulo = tituloInput.value;
    let autor = autorInput.value;
    let precio = parseFloat(precioInput.value);
    let genero = generoInput.value;
    if (disponibleCheckbox.checked) {
        var disponible = true;
    }
    else {        
        var disponible = false;
    }

    console.log(disponible);
    const nuevoLibro = new LibroCl(isbn, titulo, autor, precio, disponible, genero);
    return nuevoLibro;
}

const validarFormulario = (): boolean => {
    let errores: string[] = [];
    erroresForm.innerHTML = '';

    if (tituloInput.value.trim() === '') {
        errores.push('El título es obligatorio.');
    }
    if (autorInput.value.trim() === '') {
        errores.push('El autor es obligatorio.');
    }
    if (precioInput.value.trim() === '' || isNaN(parseFloat(precioInput.value))) {
        errores.push('El precio debe ser un número válido.');
    }
    if (generoInput.value.trim() === '') {
        errores.push('El género es obligatorio.');
    }

    if (errores.length > 0) {
        erroresForm.style.display = 'block';

        for (const error of errores) {
            const p = document.createElement('p');
            p.textContent = error;
            erroresForm.appendChild(p);
        }
        return false;
    }

    erroresForm.style.display = 'none';
    return true;
};

const limpiarFormulario = () => {
    tituloInput.value = '';
    autorInput.value = '';
    precioInput.value = '';
    generoInput.value = '';
    disponibleCheckbox.checked = false;
};

filtrar.addEventListener('click', () => {
    const autor = filtroAutor.value;
    renderizar(buscarPorAutor(autor));
});

disponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
});

todos.addEventListener('click', () => {
    renderizar(catalogo);
});

agregarLibroBoton.addEventListener('click', () => {
    if (!validarFormulario()) return;

    const nuevoLibro = altaLibro();
    catalogo.push(nuevoLibro);
    renderizar(catalogo);
    limpiarFormulario();
});