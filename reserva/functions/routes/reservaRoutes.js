const express = require("express");
const {reservarTaxi} = require("../controllers/reservaController");
const {authMiddleware} = require("../middlewares/authMiddleware");

// eslint-disable-next-line new-cap
const reservaRoutes = express.Router();

// Ruta para reservar taxi
reservaRoutes.post("/reservar", authMiddleware, reservarTaxi);

module.exports = {reservaRoutes};
