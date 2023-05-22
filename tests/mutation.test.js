const { hasMutation } = require('../src/mutation');

// Pruebas para hasMutation
describe('hasMutation', () => {
  // Prueba de mutación en una fila
  it('detecta mutación en una fila', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAGG',
      'CCCCTA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(true);
  });

  // Prueba de no mutación en ninguna fila
  it('no detecta mutación en ninguna fila', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(false);
  });

  // Prueba de mutación en una columna
  it('detecta mutación en una columna', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAGG',
      'CCCCTA',
      'TCACTA',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(true);
  });

  // Prueba de no mutación en ninguna columna
  it('no detecta mutación en ninguna columna', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(false);
  });

  // Prueba de mutación en una diagonal superior
  it('detecta mutación en una diagonal superior', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGAAAG',
      'GCGTCA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(true);
  });

  // Prueba de no mutación en ninguna diagonal superior
  it('no detecta mutación en ninguna diagonal superior', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(false);
  });

  // Prueba de mutación en una diagonal inferior
  it('detecta mutación en una diagonal inferior', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATGT',
      'AGGAGG',
      'GCGTCA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(true);
  });

  // Prueba de no mutación en ninguna diagonal inferior
  it('no detecta mutación en ninguna diagonal inferior', () => {
    const dna = [
      'ATGCGA',
      'CAGTGC',
      'TTATTT',
      'AGACGG',
      'GCGTCA',
      'TCACTG',
    ];
    const result = hasMutation(dna);
    expect(result).toBe(false);
  });
});
