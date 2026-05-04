const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/perfil", authMiddleware, usuarioController.getPerfil);
router.put("/perfil", authMiddleware, usuarioController.updatePerfil);

module.exports = router;
