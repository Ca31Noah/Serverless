import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistroForm from './components/RegistroForm';
import LoginForm from './components/LoginForm';
import ReservaTaxiForm from './components/ReservaTaxiForm';
import './styles.css';

const App = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  const handleLoginExitoso = () => {
    setUsuarioLogueado(true);
  };

  const handleRegistroExitoso = () => {
    // Agregar lógica adicional si es necesario después del registro exitoso
    // ...

    // Redirigir a la página de login después del registro exitoso
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<RegistroForm onRegistroExitoso={handleRegistroExitoso} />}
        />
        <Route
          path="/login"
          element={
            usuarioLogueado ? (
              <Navigate to="/reserva" />
            ) : (
              <LoginForm onLoginExitoso={handleLoginExitoso} />
            )
          }
        />
        {usuarioLogueado && (
          <Route path="/reserva" element={<ReservaTaxiForm />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
