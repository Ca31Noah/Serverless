const express = require("express");
const admin = require("firebase-admin");

// eslint-disable-next-line new-cap
const router = express.Router();

const registroController = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;

    // Comprobar si el usuario ya existe
    // eslint-disable-next-line max-len
    const userExist = await admin.auth().getUserByEmail(email).then(() => true).catch(() => false);

    if (userExist) {
      return res.status(400).json({error: "El usuario ya existe"});
    }

    // Lógica para registrar usuarios en Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    res.json({mensaje: "Usuario registrado correctamente", id: userRecord.uid});
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({error: "Error interno del servidor"});
  }
};

router.post("/", registroController);

module.exports = router;
