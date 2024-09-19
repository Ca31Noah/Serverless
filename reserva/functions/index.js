const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {reservaRoutes} = require("./routes/reservaRoutes");

const app = express();
app.use(cors());

// Parsear las solicitudes a JSON
app.use(bodyParser.json());

// Rutas de reserva
app.use("/api/reserva", reservaRoutes);

// Crear una función de Firebase a partir de la aplicación Express
exports.apps = functions.https.onRequest(app);
