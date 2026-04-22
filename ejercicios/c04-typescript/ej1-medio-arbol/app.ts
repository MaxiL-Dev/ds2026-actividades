const cantidad = document.querySelector('#numero') as HTMLInputElement;
const boton = document.querySelector('#boton') as HTMLButtonElement;
const salida = document.querySelector('#salida') as HTMLElement;

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

    salida.textContent = resultado;
});