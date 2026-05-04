const express = require("express");
const router = express.Router();
const tarjetaController = require("../controllers/tarjetaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, tarjetaController.getMisTarjetas);
router.post("/solicitar", authMiddleware, tarjetaController.solicitarTarjeta);
router.patch("/:id/estado", authMiddleware, tarjetaController.cambiarEstadoTarjeta);

module.exports = router;
