const express = require("express");
const router = express.Router();
const tarjetaController = require("../controllers/tarjetaController");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis tarjetas
router.get("/", verifyToken, authorize(["cliente", "admin"]), tarjetaController.getMisTarjetas);
// [cliente] → Solicitar una nueva tarjeta
router.post("/solicitar", verifyToken, authorize(["cliente"]), tarjetaController.solicitarTarjeta);
// [cliente, admin] → Bloquear o activar una tarjeta
router.patch("/:id/estado", verifyToken, authorize(["cliente", "admin"]), tarjetaController.cambiarEstadoTarjeta);

module.exports = router;
