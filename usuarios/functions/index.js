const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const registroRouter = require("./routes/registro");
const loginRouter = require("./routes/login");

const app = express();

app.use(cors());

// Inicializa Firebase con las credenciales del archivo serviceAccountKey.json
admin.initializeApp({
  // eslint-disable-next-line max-len
  credential: admin.credential.cert("./serviceAccountKey.json"), // Reemplaza con la ruta correcta
  databaseURL: "https://serverless-gt-default-rtdb.firebaseio.com", // Reemplaza con la URL de tu base de datos Firestore
});

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
};

// Middleware para manejar rutas no encontradas
const notFoundHandler = (req, res, next) => {
  res.status(404).send("Ruta no encontrada");
};

// Middleware de registro
app.use("/api/auth/registro", registroRouter);

// Middleware de inicio de sesión
app.use("/api/auth/login", loginRouter);

// Manejo de errores y rutas no encontradas
app.use(errorHandler);
app.use(notFoundHandler);

exports.app = functions.https.onRequest(app);
