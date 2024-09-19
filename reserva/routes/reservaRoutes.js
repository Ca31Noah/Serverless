const express = require('express');
const { reservarTaxi } = require('../controllers/reservaController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const reservaRoutes = express.Router();

// Ruta para reservar taxi
reservaRoutes.post('/reservar', authMiddleware, reservarTaxi);

module.exports = { reservaRoutes };
