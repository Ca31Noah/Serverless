import React, { useState } from 'react';
import axios from 'axios';

const ReservaTaxiForm = () => {
  const [usuario, setUsuario] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleReserva = async () => {
    try {
      const response = await axios.post(' https://us-central1-serverless-gt.cloudfunctions.net/apps/api/reserva/reservar', {
        usuario,
        origen,
        destino,
      });

      console.log(response.data);
      setMensaje('Reserva exitosa');

    } catch (error) {
      console.error('Error al hacer la reserva de taxi:', error);
      // Puedes manejar el error según tus necesidades
    }
  };

  return (
    <div className="auth-form">
      <h2>Reserva de Taxi</h2>
      <form>
      <label>Usuario:</label>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <label>Origen:</label>
        <input type="text" value={origen} onChange={(e) => setOrigen(e.target.value)} />
        <label>Destino:</label>
        <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} />
        <button type="button" onClick={handleReserva}>Hacer Reserva</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
};

export default ReservaTaxiForm;
