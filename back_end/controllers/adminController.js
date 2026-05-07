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
      const myRole = req.user.rol ? req.user.rol.toLowerCase() : null;

      // REGLA: Solo super_admin puede asignar rol_id de admin (4) o super_admin (1)
      let rolFinal = 2; // Por defecto cliente
      if (rol_id) {
        if (myRole !== 'super_admin' && (rol_id === 1 || rol_id === 4)) {
           return res.status(403).json({ message: "Los administradores normales no pueden crear otros administradores." });
        }
        rolFinal = rol_id;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await Usuario.create({
        nombre, apellido, email, password: hashedPassword, telefono, dui,
        rol_id: rolFinal,
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
      const { nombre, apellido, email, password, telefono, dui, rol_id, estado } = req.body;
      const myRole = req.user.rol ? req.user.rol.toLowerCase() : null;
      
      const targetUser = await Usuario.findByPk(id, { include: [{ model: Rol, as: "rol" }] });
      if (!targetUser) return res.status(404).json({ message: "Usuario no encontrado" });

      const targetRoleName = targetUser.rol ? targetUser.rol.nombre.toLowerCase() : '';

      // REGLA: Admin normal NO puede editar cuentas de admin o super_admin
      if (myRole === 'admin' && (targetRoleName === 'admin' || targetRoleName === 'super_admin')) {
        return res.status(403).json({ message: "Privilegios insuficientes para modificar a otro administrador." });
      }

      // REGLA: Admin normal NO puede cambiar roles
      let rolFinal = targetUser.rol_id;
      if (rol_id && rol_id !== targetUser.rol_id) {
        if (myRole !== 'super_admin') {
          return res.status(403).json({ message: "Solo el Super Admin puede cambiar roles." });
        }
        rolFinal = rol_id;
      }

      let estadoFinal = targetUser.estado;
      if (estado && estado !== targetUser.estado) {
         estadoFinal = estado;
      }

      const updateData = { nombre, apellido, email, telefono, dui, rol_id: rolFinal, estado: estadoFinal };

      if (password && password.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      await targetUser.update(updateData);
      res.json({ message: "Usuario actualizado correctamente", targetUser });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const myRole = req.user.rol ? req.user.rol.toLowerCase() : null;
      const myId = req.user.id;

      // REGLA: El super admin no puede eliminarse a sí mismo
      if (parseInt(id) === parseInt(myId)) {
        return res.status(403).json({ message: "Acción denegada: No puedes eliminar tu propia cuenta." });
      }

      const targetUser = await Usuario.findByPk(id, { include: [{ model: Rol, as: "rol" }] });
      if (!targetUser) return res.status(404).json({ message: "Usuario no encontrado" });

      const targetRoleName = targetUser.rol ? targetUser.rol.nombre.toLowerCase() : '';

      // REGLA: Admin normal NO puede eliminar a otro admin o super_admin
      if (myRole === 'admin' && (targetRoleName === 'admin' || targetRoleName === 'super_admin')) {
        return res.status(403).json({ message: "Privilegios insuficientes para eliminar a otro administrador." });
      }

      await targetUser.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }
};

module.exports = adminController;
