const admin = require('firebase-admin');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Lógica para autenticar usuarios en Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);

    // Verifica la contraseña
    const isPasswordValid = await admin.auth().comparePassword(password, userRecord.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Login exitoso', uid: userRecord.uid, username: userRecord.displayName });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ error: 'Error en el proceso de login' });
  }
};

module.exports = loginController;
