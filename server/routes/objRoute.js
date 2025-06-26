const express = require("express");
const router = express.Router();
const {criarObjetivo, listarObjetivos, getObjetivoPorMes, atualizarObjetivo, deletarObjetivo} 
= require("../controller/objController");

const verifyToken = require("../middlewares/authMiddleware");
 
router.post("/objetivo", verifyToken, criarObjetivo);
router.get("/objetivos", verifyToken, listarObjetivos);
router.get("/objetivo/", verifyToken, getObjetivoPorMes);
router.put("/objetivo/:id", verifyToken, atualizarObjetivo);
router.delete("/objetivo/:id", verifyToken, deletarObjetivo);

module.exports = router;
