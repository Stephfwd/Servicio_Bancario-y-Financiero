const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No hay token, autorización denegada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key_default");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no es válido" });
  }
};

module.exports = authMiddleware;
