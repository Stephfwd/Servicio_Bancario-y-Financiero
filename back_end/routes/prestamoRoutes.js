const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis préstamos
router.get("/", verifyToken, authorize(["cliente", "admin"]), prestamoController.getMisPrestamos);
// [cliente] → Solicitar un préstamo
router.post("/solicitar", verifyToken, authorize(["cliente"]), prestamoController.solicitarPrestamo);
// [cliente, admin] → Ver detalle de un préstamo
router.get("/:id", verifyToken, authorize(["cliente", "admin"]), prestamoController.getPrestamoDetalle);

module.exports = router;
