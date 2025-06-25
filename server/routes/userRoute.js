const express = require("express");
const router = express.Router();
const {register, login} = require("../controller/authController");

// Rotas para registro e auth do user

router.post("/user", register);
router.get("/login", login);

module.exports = router;