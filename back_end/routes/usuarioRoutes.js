const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver perfil propio
router.get("/perfil", verifyToken, authorize(["cliente", "admin"]), usuarioController.getPerfil);
// [cliente, admin] → Actualizar perfil propio
router.put("/perfil", verifyToken, authorize(["cliente", "admin"]), usuarioController.updatePerfil);

module.exports = router;
