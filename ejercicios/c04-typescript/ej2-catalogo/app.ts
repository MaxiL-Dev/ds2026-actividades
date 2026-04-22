const filtroAutor = document.getElementById('filtroAutor') as HTMLInputElement;
const listado = document.getElementById('listado') as HTMLElement;
const precioProm = document.getElementById('stats') as HTMLElement;

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

    libroHTML.appendChild(titulo);
    libroHTML.appendChild(autor);
    libroHTML.appendChild(precio);
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
