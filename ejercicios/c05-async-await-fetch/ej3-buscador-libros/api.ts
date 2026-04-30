import { LibroOL } from "./interface.js";

export const obtenerLibros = async (busqueda: string): Promise<LibroOL[]> => {

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const libros: LibroOL[] = data.docs.map((libro: LibroOL) => ({
        title: libro.title,
        author_name: libro.author_name,
        first_publish_year: libro.first_publish_year
    }));
    return libros;
};
