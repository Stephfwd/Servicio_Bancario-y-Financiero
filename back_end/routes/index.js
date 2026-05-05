const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const usuarioRoutes = require("./usuarioRoutes");
const cuentaRoutes = require("./cuentaRoutes");
const transaccionRoutes = require("./transaccionRoutes");
const tarjetaRoutes = require("./tarjetaRoutes");
const prestamoRoutes = require("./prestamoRoutes");
const beneficiarioRoutes = require("./beneficiarioRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/cuentas", cuentaRoutes);
router.use("/transacciones", transaccionRoutes);
router.use("/tarjetas", tarjetaRoutes);
router.use("/prestamos", prestamoRoutes);
router.use("/beneficiarios", beneficiarioRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
