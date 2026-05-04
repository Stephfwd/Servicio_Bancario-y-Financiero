const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, prestamoController.getMisPrestamos);
router.post("/solicitar", authMiddleware, prestamoController.solicitarPrestamo);
router.get("/:id", authMiddleware, prestamoController.getPrestamoDetalle);

module.exports = router;
