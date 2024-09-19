const express = require("express");
const loginController = require("../controllers/loginController");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", loginController);

module.exports = router;
