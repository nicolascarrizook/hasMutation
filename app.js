const express = require('express');
const bodyParser = require('body-parser');
const { hasMutation, isValidDNA } = require('./src/mutation');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URL;
const dbName = 'hasMutation';
const app = express();

async function startServer() {
    try {
        const db = await connectToMongoDB();

        app.use(bodyParser.json());

        app.post('/mutation', async (req, res) => {
            const { dna } = req.body;

            if (!dna || !Array.isArray(dna)) {
                return res.status(400).json({ error: 'La secuencia de ADN es inválida' });
            }

            if (!isValidDNA(dna)) {
                return res.status(400).json({ error: 'La secuencia de ADN contiene bases nitrogenadas inválidas' });
            }

            const result = hasMutation(dna);

            if (result) {
                // Guardar el ADN verificado en la base de datos
                try {
                    await db.collection('adn_verificados').insertOne({ dna });
                    console.log('ADN verificado guardado en la base de datos');
                } catch (error) {
                    console.error('Error al guardar el ADN verificado en la base de datos', error);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }

                return res.status(200).json({ message: 'Se encontró una mutación' });
            } else {
                return res.status(403).json({ message: 'No se encontró una mutación' });
            }
        });

        app.get('/stats', async (req, res) => {
            try {
                const countMutations = await db.collection('adn_verificados').countDocuments({ result: true });
                const countNoMutation = await db.collection('adn_verificados').countDocuments({ result: false });

                const ratio = countNoMutation === 0 ? 0 : countMutations / countNoMutation;

                const stats = {
                    count_mutations: countMutations,
                    count_no_mutation: countNoMutation,
                    ratio: ratio,
                };

                return res.status(200).json(stats);
            } catch (error) {
                console.error('Error al obtener las estadísticas de ADN', error);
                return res.status(500).json({ error: 'Error en el servidor' });
            }
        });

        app.listen(3003, () => {
            console.log('Servidor iniciado en el puerto 3003');
        });
    } catch (error) {
        console.error('Error al iniciar el servidor', error);
    }
    return app;
}

async function connectToMongoDB() {
    try {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      console.log('Conexión exitosa a MongoDB');
      const db = client.db(dbName);
      db.client = client; // Agregar la propiedad client al objeto db
      return db;
    } catch (error) {
      console.error('Error al conectar a MongoDB', error);
      throw error;
    }
  }
  


startServer();

module.exports = {
    startServer,
    connectToMongoDB,
    app
}



