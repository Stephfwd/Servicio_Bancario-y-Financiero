const { Usuario, Rol, Cuenta } = require("../models");
const bcrypt = require("bcryptjs");

const adminController = {
  // --- Gestión de Roles ---
  getAllRoles: async (req, res) => {
    try {
      const roles = await Rol.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener roles" });
    }
  },

  createRole: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      const role = await Rol.create({ nombre, descripcion });
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ message: "Error al crear rol" });
    }
  },

  // --- Gestión de Usuarios ---
  getAllUsers: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["password"] },
        include: [{ model: Rol, as: "rol" }]
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { nombre, apellido, email, password, telefono, dui, rol_id } = req.body;
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await Usuario.create({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        telefono,
        dui,
        rol_id: rol_id || 2,
        estado: 'activo'
      });

      res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, email, telefono, dui, rol_id, estado } = req.body;
      
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

      await usuario.update({ nombre, apellido, email, telefono, dui, rol_id, estado });
      res.json({ message: "Usuario actualizado correctamente", usuario });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
      
      await usuario.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }
};

module.exports = adminController;
