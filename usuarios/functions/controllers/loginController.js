const admin = require("firebase-admin");

const loginController = async (req, res) => {
  try {
    const {email, password} = req.body;

    console.log("Intento de inicio de sesión para:", email);

    // Autentica al usuario utilizando Firebase Authentication
    const userCredential = await admin.auth().getUserByEmail(email);

    // Verifica la contraseña utilizando Firebase Authentication
    await admin.auth().updateUser(userCredential.uid, {password: password});

    console.log("Inicio de sesión exitoso");

    // eslint-disable-next-line max-len
    res.status(200).json({message: "Login exitoso", uid: userCredential.uid, email: userCredential.email});
  } catch (error) {
    console.error("Error en el proceso de login:", error);

    // eslint-disable-next-line max-len
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      console.log("Credenciales inválidas");
      return res.status(401).json({error: "Credenciales inválidas"});
    }

    res.status(500).json({error: "Error en el proceso de login"});
  }
};

module.exports = loginController;
