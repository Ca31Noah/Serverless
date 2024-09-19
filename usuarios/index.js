const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const registroRouter = require('./routes/registro');
const loginRouter = require('./routes/login');

const app = express();

// Inicializa Firebase con las credenciales del archivo serviceAccountKey.json
admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'), // Reemplaza con la ruta correcta
  databaseURL: 'https://serverless-gt-default-rtdb.firebaseio.com', // Reemplaza con la URL de tu base de datos Firestore
});
console.log('Conexión con Firebase establecida correctamente.');

app.use('/api/auth/registro', registroRouter);
app.use('/api/auth/login', loginRouter);

exports.app = functions.https.onRequest(app);
