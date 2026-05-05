const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente] → Realizar una transferencia entre cuentas
router.post("/transferir", authMiddleware, authorize(["cliente"]), transaccionController.transferir);
// [cliente] → Realizar un depósito a una cuenta propia
router.post("/deposito", authMiddleware, authorize(["cliente"]), transaccionController.deposito);
// [cliente, admin] → Ver historial de transacciones de una cuenta
router.get("/historial/:cuenta_id", authMiddleware, authorize(["cliente", "admin"]), transaccionController.getHistorial);

module.exports = router;
