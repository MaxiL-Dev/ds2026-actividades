const sumarNumeros = (array) => {
    let suma = 0;

    for (const numero of array) {
        suma += numero;
    }

    return suma;
}

const promedioNumeros = (array) => {

    const suma = sumarNumeros(array);

    const cantidadNumeros = array.length;
    const promedio = suma / cantidadNumeros;

    return promedio;
}

const numeroMayor = (array) => {
    let mayor = array[0];

    for (const numero of array) {
        if (numero > mayor) {
            mayor = numero;
        }
    }

    return mayor;
}

const numeroMenor = (array) => {
    let menor = array[0];

    for (const numero of array) {
        if (numero < menor) {
            menor = numero;
        }
    }

    return menor;
}

const numeros = [20, 10, 5, 3, 8, 15, 14, 12, 18, 7];

console.log(`Suma de números: ${sumarNumeros(numeros)}`);
console.log(`Promedio: ${promedioNumeros(numeros)}`);
console.log(`Número mayor: ${numeroMayor(numeros)}`);
console.log(`Número menor: ${numeroMenor(numeros)}`);

const generarAsteriscos = (n) => {

    let resultado = '';

    for (let i = 0; i < n; i++) {
        resultado = `${resultado}*`;
    }

    return resultado;
}

console.log(generarAsteriscos(5));
console.log(generarAsteriscos(10));
