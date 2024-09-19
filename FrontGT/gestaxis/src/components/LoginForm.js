import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLoginExitoso }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      setMensaje('Login exitoso');

      const response = await axios.post(' https://us-central1-serverless-gt.cloudfunctions.net/app/api/auth/login', {
        email,
        password,
      });

      console.log(response.data);

      onLoginExitoso();
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      if (error.response) {
        setError(error.response.data.message || 'Error en el servidor');
      } else {
        setError('Error en el inicio de sesión');
      }
      setMensaje('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
        <p>¿No tienes una cuenta? <Link to="/">Regístrate aquí</Link></p>
        {mensaje && <p className="success-message">{mensaje}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
