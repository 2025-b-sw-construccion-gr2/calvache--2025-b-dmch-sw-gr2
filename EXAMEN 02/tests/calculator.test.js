const {
  parseNumbers,
  sum,
  average,
  stats,
  toNumber,
} = require('../src/calculator');

describe('parseNumbers', () => {
  test('convierte strings separados por espacios en n�meros', () => {
    expect(parseNumbers(['1', '2', '3'])).toEqual([1, 2, 3]);
  });

  test('admite valores separados por comas', () => {
    expect(parseNumbers(['1,2', '3'])).toEqual([1, 2, 3]);
  });

  test('lanza error con entradas inv�lidas', () => {
    expect(() => toNumber('a')).toThrow(/no es un n�mero v�lido/);
  });
});

describe('operaciones', () => {
  const valores = [2, 4, 6];

  test('suma correctamente', () => {
    expect(sum(valores)).toBe(12);
  });

  test('calcula promedio', () => {
    expect(average(valores)).toBeCloseTo(4);
  });

  test('estad�sticas b�sicas', () => {
    expect(stats(valores)).toEqual({
      total: 12,
      promedio: 4,
      minimo: 2,
      maximo: 6,
      cantidad: 3,
    });
  });

  test('promedio arroja error si no hay datos', () => {
    expect(() => average([])).toThrow(/Se necesita al menos un n�mero/);
  });
});
