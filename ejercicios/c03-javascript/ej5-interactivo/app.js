const cantidad = document.querySelector('#numero');
const boton = document.querySelector('#boton');

boton.addEventListener('click', () => {
    const numero = parseInt(cantidad.value);

    if (isNaN(numero) || numero < 1) {
        alert('Por favor, ingresa un número válido mayor que 0.');
        return;
    }

    let resultado = '';

    for (let i = 0; i <= numero; i++) {
        for (let j = 0; j < i; j++) {
            resultado += '*';
        }
        resultado += '\n';
    }

    const salida = document.querySelector('#salida');
    salida.textContent = resultado;
});