const { Usuario, Rol } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, dui, rol_id } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const userExists = await Usuario.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      telefono,
      dui,
      rol_id: rol_id || 2, // Por defecto rol de cliente si no se especifica
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    // Buscar usuario
    const user = await Usuario.findOne({ 
      where: { email },
      include: [{ model: Rol, as: "rol" }]
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar Token
    const token = jwt.sign(
      { id: user.id, rol: user.rol.nombre },
      process.env.JWT_SECRET || "secret_key_default",
      { expiresIn: "24h" }
    );

    // Configurar cookie segura
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

    res.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol.nombre
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login", error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Sesión cerrada correctamente" });
};

const verifySession = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.user.id, {
      include: [{ model: Rol, as: "rol" }]
    });
    
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol.nombre
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar sesión" });
  }
};

module.exports = {
  register,
  login,
  logout,
  verifySession
};
