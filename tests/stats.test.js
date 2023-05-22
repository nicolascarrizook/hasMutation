const request = require('supertest');
const {app} = require('../app');
const { connectToMongoDB } = require('../app');

describe('Endpoint /stats', () => {
  let db;

  beforeAll(async () => {
    db = await connectToMongoDB();
  });

  afterAll(async () => {
    await db.client.close();
  });

  it('debe devolver las estadísticas de ADN', async () => {
    // Insertar algunos registros en la base de datos para las pruebas
    await db.collection('adn_verificados').insertMany([
      { dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'], result: true },
      { dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'], result: false },
    ]);

    // Realizar una solicitud GET al endpoint /stats
    const response = await request(app).get('/stats');

    // Verificar el código de estado y el objeto JSON devuelto
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      count_mutations: 9,
      count_no_mutation: 9,
      ratio: 1,
    });
  });
});
