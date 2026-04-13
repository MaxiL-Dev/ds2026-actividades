const calcularPrecioFinal = (monto, medioPago) => {

    let precioFinal;

    if (monto < 200) {
        precioFinal = monto;
    }

    else if (monto >= 200 && monto < 400) {
        if (medioPago === 'E') {
            precioFinal = monto * 0.7;
        }
        else if (medioPago === 'D') {
            precioFinal = monto * 0.8;
        }
        else if (medioPago === 'C') {
            precioFinal = monto * 0.9;
        }
    }
    
    else if (monto >= 400) {
        precioFinal = monto * 0.6;
    }
    
    if (medioPago === 'E') {
        return `Monto: ${monto}$ | Pago: Efectivo | Precio Final: ${precioFinal}$`;
    }
    else if (medioPago === 'D') {
        return `Monto: ${monto}$| Pago: Débito | Precio Final: ${precioFinal}$`;
    }
    else if (medioPago === 'C') {
        return `Monto: ${monto}$ | Pago: Crédito | Precio Final: ${precioFinal}$`;
    }
    
}

console.log(calcularPrecioFinal(150, 'E'));
console.log(calcularPrecioFinal(250, 'D'));
console.log(calcularPrecioFinal(350, 'C'));
console.log(calcularPrecioFinal(450, 'E'));
console.log(calcularPrecioFinal(450, 'D'));
console.log(calcularPrecioFinal(450, 'C'));