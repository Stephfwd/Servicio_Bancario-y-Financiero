const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis préstamos
router.get("/", authMiddleware, authorize(["cliente", "admin"]), prestamoController.getMisPrestamos);
// [cliente] → Solicitar un préstamo
router.post("/solicitar", authMiddleware, authorize(["cliente"]), prestamoController.solicitarPrestamo);
// [cliente, admin] → Ver detalle de un préstamo
router.get("/:id", authMiddleware, authorize(["cliente", "admin"]), prestamoController.getPrestamoDetalle);

module.exports = router;
