const producto = document.querySelector('#producto');
const boton = document.querySelector('#agregar');
const lista = document.querySelector('#lista');
const cantidad = document.querySelector('#cantidad');

boton.addEventListener('click', () => {
    const nombreProducto = producto.value.trim();
    
    if (nombreProducto === '') {
        alert('Por favor, ingresa el nombre de un producto.');
        return;
    }

    const item = document.createElement('li');
    item.textContent = nombreProducto + ' ';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';

    btnEliminar.addEventListener('click', () => {
        item.remove();
        cantidad.textContent = lista.children.length;
    });

    item.appendChild(btnEliminar);

    lista.appendChild(item);

    producto.value = '';

    cantidad.textContent = lista.children.length;
    
});