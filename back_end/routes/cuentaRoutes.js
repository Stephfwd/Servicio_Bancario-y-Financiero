const express = require("express");
const router = express.Router();
const cuentaController = require("../controllers/cuentaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, cuentaController.getMisCuentas);
router.post("/", authMiddleware, cuentaController.createCuenta);
router.get("/:id", authMiddleware, cuentaController.getCuentaDetalle);

module.exports = router;
