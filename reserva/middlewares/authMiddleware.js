function authMiddleware(req, res, next) {
  // Lógica de autenticación aquí
  // Puedes verificar el token, sesión, etc.

  // Si la autenticación es exitosa, continúa con la siguiente función en la cadena
  next();
}

module.exports = { authMiddleware };
