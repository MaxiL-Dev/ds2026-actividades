const clasificarNota = (nota) => {
    if (nota >= 0 && nota <= 4) {
        return 'Desaprobado';
    }
    else if (nota >= 5 && nota <= 6) {
        return 'Aprobado';
    }
    else if (nota >= 7 && nota <= 10) {
        return 'Promocionado';
    }
    else {
        return 'Nota inválida';
    }
}

function diaDeLaSemana(dia) {
    switch (dia) {
        case '1': return 'Lunes'; break;
        case '2': return 'Martes'; break;
        case '3': return 'Miércoles'; break;
        case '4': return 'Jueves'; break;
        case '5': return 'Viernes'; break;
        case '6': return 'Sábado (fin de semana)'; break;
        case '7': return 'Domingo (fin de semana)'; break;
        default: return 'Número de día inválido';
    }
}

console.log(clasificarNota(3));
console.log(clasificarNota(5)); 
console.log(clasificarNota(8)); 
console.log(clasificarNota(11));

console.log(diaDeLaSemana('1'));
console.log(diaDeLaSemana('5'));
console.log(diaDeLaSemana('7'));
console.log(diaDeLaSemana('8'));