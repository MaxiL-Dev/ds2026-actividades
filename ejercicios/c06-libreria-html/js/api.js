export const obtenerLibros = async (busqueda) => {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const libros = data.docs.map((libro) => ({
        title: libro.title,
        author_name: libro.author_name,
        image: libro.cover_i
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : 'assets/no-cover.png'
    }));
    return libros;
};
