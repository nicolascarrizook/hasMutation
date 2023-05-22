# ADN MUTATION API

Esta es una API que verifica mutaciones en secuencias de ADN y proporciona estadísticas sobre las mismas. Está construida con Node.js, Express y utiliza MongoDB como base de datos.

# Requisitos previos

Asegúrate de tener instalado lo siguiente:

Node.js
MongoDB

# Configuración 

  1. Clona este repositorio: 

  git clone https://github.com/tu-usuario/tu-repositorio.git


  2. Instala las dependencias ejecutando el siguiente comando en la raíz del proyecto:

  npm install

  3. Crea un archivo .env en la raíz del proyecto y agrega la siguiente configuración:

  MONGODB_URL=URL_de_conexión_de_MongoDB

Asegúrate de reemplazar URL_de_conexión_de_MongoDB por la URL de conexión de tu instancia de MongoDB.

# Uso

  1. Inicia el servidor ejecutando el siguiente comando en la raíz del proyecto:

  npm start

El servidor se iniciará en el puerto 3003.

  2. Verificar una mutación:

Realiza una solicitud POST a http://localhost:3003/mutation con el siguiente cuerpo JSON:

{
  "dna": [
    "ATGCGA",
    "CAGTGC",
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
  ]
}


Si la secuencia de ADN contiene una mutación, la API devolverá un código de estado 200 y un mensaje indicando que se encontró una mutación. Si no se encuentra una mutación, la API devolverá un código de estado 403 y un mensaje indicando que no se encontró una mutación.


3. Obtener estadísticas:

Realiza una solicitud GET a http://localhost:3003/stats. La API devolverá un objeto JSON con las estadísticas de las mutaciones:

{
  "count_mutations": 7,
  "count_no_mutation": 7,
  "ratio": 1
}


count_mutations: El número total de mutaciones encontradas.
count_no_mutation: El número total de secuencias de ADN sin mutación.
ratio: La relación entre el número de mutaciones y el número de secuencias de ADN sin mutación.

# Estructura del proyecto

app.js: Archivo principal que configura el servidor Express y define las rutas de la API.
src/mutation.js: Módulo que contiene las funciones para verificar mutaciones en secuencias de ADN y validar el ADN.
tests/stats.test.js: Archivo de prueba que verifica el endpoint /stats.


# Dependencias 

body-parser: Middleware para analizar el cuerpo de las solicitudes HTTP.
dotenv: Carga las variables de entorno desde un archivo .env.
express: Framework web rápido y minimalista para Node.js.
mongodb: Controlador oficial de MongoDB para Node.js.
redis: Cliente para interactuar con una base de datos Redis.

# Dependencias de desarrollo

jest: Framework de pruebas para JavaScript.
supertest: Módulo para realizar pruebas de API HTTP.

# Scripts

test: Ejecuta los casos de prueba. Actualmente, este script muestra un mensaje de error indicando que no se especificaron pruebas y finaliza con un código de salida 1.

