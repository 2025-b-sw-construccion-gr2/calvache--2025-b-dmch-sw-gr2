function toNumber(value) {
  const number = Number(value);
  if (Number.isNaN(number)) {
    throw new Error(`"${value}" no es un n�mero v�lido.`);
  }
  return number;
}

function parseNumbers(args = []) {
  return args
    .flatMap((part) => part.split(','))
    .filter((value) => value !== '')
    .map((value) => toNumber(value.trim()));
}

function sum(numbers) {
  return numbers.reduce((total, current) => total + current, 0);
}

function average(numbers) {
  if (numbers.length === 0) {
    throw new Error(
      'Se necesita al menos un n�mero para calcular el promedio.'
    );
  }
  return sum(numbers) / numbers.length;
}

function stats(numbers) {
  if (numbers.length === 0) {
    throw new Error('No se puede generar estad�sticas sin n�meros.');
  }

  return {
    total: sum(numbers),
    promedio: average(numbers),
    minimo: Math.min(...numbers),
    maximo: Math.max(...numbers),
    cantidad: numbers.length,
  };
}

module.exports = {
  toNumber,
  parseNumbers,
  sum,
  average,
  stats,
};
