const { Usuario, Rol } = require("../models");

const getPerfil = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const usuario = await Usuario.findByPk(usuario_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Rol, as: "rol" }]
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener perfil", error: error.message });
  }
};

const updatePerfil = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { nombre, apellido, telefono } = req.body;

    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.update({ nombre, apellido, telefono });

    res.json({ message: "Perfil actualizado correctamente", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil", error: error.message });
  }
};

module.exports = {
  getPerfil,
  updatePerfil
};
