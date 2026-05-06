const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token de acceso" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key_default");
    req.user = decoded; // { id, rol }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de administrador" });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
