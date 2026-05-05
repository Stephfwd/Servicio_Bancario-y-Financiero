const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver perfil propio
router.get("/perfil", authMiddleware, authorize(["cliente", "admin"]), usuarioController.getPerfil);
// [cliente, admin] → Actualizar perfil propio
router.put("/perfil", authMiddleware, authorize(["cliente", "admin"]), usuarioController.updatePerfil);

module.exports = router;
