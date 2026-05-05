const express = require("express");
const router = express.Router();
const tarjetaController = require("../controllers/tarjetaController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis tarjetas
router.get("/", authMiddleware, authorize(["cliente", "admin"]), tarjetaController.getMisTarjetas);
// [cliente] → Solicitar una nueva tarjeta
router.post("/solicitar", authMiddleware, authorize(["cliente"]), tarjetaController.solicitarTarjeta);
// [cliente, admin] → Bloquear o activar una tarjeta
router.patch("/:id/estado", authMiddleware, authorize(["cliente", "admin"]), tarjetaController.cambiarEstadoTarjeta);

module.exports = router;
