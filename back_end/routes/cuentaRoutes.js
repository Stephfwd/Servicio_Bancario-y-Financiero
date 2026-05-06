const express = require("express");
const router = express.Router();
const cuentaController = require("../controllers/cuentaController");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis cuentas
router.get("/", verifyToken, authorize(["cliente", "admin"]), cuentaController.getMisCuentas);
// [cliente] → Crear nueva cuenta
router.post("/", verifyToken, authorize(["cliente"]), cuentaController.createCuenta);
// [cliente, admin] → Ver detalle de una cuenta
router.get("/:id", verifyToken, authorize(["cliente", "admin"]), cuentaController.getCuentaDetalle);

module.exports = router;
