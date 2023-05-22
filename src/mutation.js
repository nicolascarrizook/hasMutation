function hasMutation(dna) {
  // Validar la matriz de ADN
  if (!isValidDNA(dna)) {
    throw new Error('La secuencia de ADN contiene bases nitrogenadas inválidas.');
  }

  const n = dna.length; // Tamaño de la matriz NxN

  // Verificar mutación en las filas
  for (let i = 0; i < n; i++) {
    if (hasMutationInSequence(dna[i])) {
      return true;
    }
  }

  // Verificar mutación en las columnas
  for (let j = 0; j < n; j++) {
    const column = [];
    for (let i = 0; i < n; i++) {
      column.push(dna[i][j]);
    }
    if (hasMutationInSequence(column)) {
      return true;
    }
  }

  // Verificar mutación en las diagonales superiores
  for (let i = 0; i < n - 3; i++) {
    for (let j = 0; j < n - 3; j++) {
      const diagonal = [];
      for (let k = 0; k < 4; k++) {
        diagonal.push(dna[i + k][j + k]);
      }
      if (hasMutationInSequence(diagonal)) {
        return true;
      }
    }
  }

  // Verificar mutación en las diagonales inferiores
  for (let i = 3; i < n; i++) {
    for (let j = 0; j < n - 3; j++) {
      const diagonal = [];
      for (let k = 0; k < 4; k++) {
        diagonal.push(dna[i - k][j + k]);
      }
      if (hasMutationInSequence(diagonal)) {
        return true;
      }
    }
  }

  // No se encontró ninguna mutación
  return false;
}

const validBases = ['A', 'T', 'C', 'G'];

function isValidBase(base) {
  return validBases.includes(base);
}

function isValidDNA(dna) {
  for (let i = 0; i < dna.length; i++) {
    for (let j = 0; j < dna[i].length; j++) {
      if (!isValidBase(dna[i][j])) {
        return false;
      }
    }
  }
  return true;
}

function hasMutationInSequence(sequence) {
  const n = sequence.length;
  let count = 1; // Contador de repeticiones consecutivas
  for (let i = 1; i < n; i++) {
    if (sequence[i] === sequence[i - 1]) {
      count++;
      if (count === 4) {
        return true; // Se encontró una secuencia de 4 bases nitrogenadas iguales
      }
    } else {
      count = 1; // Reiniciar contador
    }
  }
  return false;
}

module.exports = {
    hasMutation,
    isValidDNA
};