const admin = require("firebase-admin");

const authMiddleware = async (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).json({error: "Acceso no autorizado.Falta el token"});
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({error: "Token de autenticación inválido."});
  }
};

module.exports = authMiddleware;
