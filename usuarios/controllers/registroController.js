const admin = require('firebase-admin');

const registroController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Comprobar si el usuario ya existe
    const userExist = await admin.auth().getUserByEmail(email).then(() => true).catch(() => false);

    if (userExist) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Lógica para registrar usuarios en Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    // Puedes guardar más información del usuario en Firestore si es necesario
    await admin.firestore().collection('usuarios').doc(userRecord.uid).set({
      username,
      email,
      password
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', uid: userRecord.uid, username: userRecord.displayName });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

module.exports = registroController;
