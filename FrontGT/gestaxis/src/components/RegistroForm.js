import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistroForm = ({ onRegistroExitoso }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleRegistro = async () => {
    try {
      setError('');
      setMensaje('Usuario Registrado');

      const response = await axios.post(' https://us-central1-serverless-gt.cloudfunctions.net/app/api/auth/registro', {
        username,
        email,
        password,
      });

      console.log(response.data);
      
      onRegistroExitoso();
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      if (error.response) {
        setError(error.response.data.message || 'Error en el servidor');
      } else {
        setError('Error en la solicitud de registro');
      }
      setMensaje('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Registro</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleRegistro}>Registrar</button>
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        {mensaje && <p className="success-message">{mensaje}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegistroForm;
