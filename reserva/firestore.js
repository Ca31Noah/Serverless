// firestore.js
const admin = require('firebase-admin');

// Debes descargar el archivo de configuración de tu proyecto Firebase desde la consola de Firebase
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://serverless-gt-default-rtdb.firebaseio.com/', // Reemplaza con tu URL de Firebase
});

const db = admin.firestore();

module.exports = db;
