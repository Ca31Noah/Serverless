const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const { reservaRoutes } = require('./routes/reservaRoutes');

const app = express();

// Parsear las solicitudes a JSON
app.use(bodyParser.json());

// Rutas de reserva
app.use('/api/reserva', reservaRoutes);

// Crear una función de Firebase a partir de la aplicación Express
exports.app = functions.https.onRequest(app);
