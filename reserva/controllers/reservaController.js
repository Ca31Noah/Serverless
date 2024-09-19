const admin = require('firebase-admin');
const Reserva = require('../model/reservaModel');

admin.initializeApp();
const db = admin.firestore();

async function reservarTaxi(req, res) {
  try {
    // Obtener datos de la solicitud
    const data = req.body;

    // Validar datos de reserva (ejemplo)
    if (!data || !data.usuario || !data.origen || !data.destino) {
      return res.status(400).send('Datos de reserva incompletos.');
    }

    // Crear instancia del modelo
    const nuevaReserva = new Reserva(data.usuario, data.origen, data.destino);

    // Guardar reserva en Firestore
    const reservaRef = await db.collection('reservas').add(Object.assign({}, nuevaReserva));    

    // Enviar respuesta con ID de la reserva
    return res.status(200).json({ id: reservaRef.id, mensaje: 'Reserva exitosa'  });
  } catch (error) {
    console.error('Error al procesar la reserva:', error);
    return res.status(500).send('Error interno al procesar la reserva.');
  }
}

module.exports = {
  reservarTaxi,
};
