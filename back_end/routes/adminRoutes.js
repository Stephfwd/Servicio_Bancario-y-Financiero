const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const { Usuario, Cuenta, Rol } = require("../models");

// [admin] → Ver todos los usuarios registrados
router.get("/usuarios", authMiddleware, authorize(["admin"]), async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Rol, as: "rol" }],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
});

// [admin] → Ver todas las cuentas del sistema
router.get("/cuentas", authMiddleware, authorize(["admin"]), async (req, res) => {
  try {
    const cuentas = await Cuenta.findAll({
      include: [{ model: Usuario, as: "usuario", attributes: ["nombre", "apellido", "email"] }],
    });
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cuentas", error: error.message });
  }
});

// [admin] → Cambiar el estado de un usuario (activo/inactivo)
router.patch("/usuarios/:id/estado", authMiddleware, authorize(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // 'activo' o 'inactivo'

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.update({ estado });
    res.json({ message: `Usuario ${estado} correctamente`, usuario: { id: usuario.id, nombre: usuario.nombre, estado: usuario.estado } });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado del usuario", error: error.message });
  }
});

module.exports = router;
