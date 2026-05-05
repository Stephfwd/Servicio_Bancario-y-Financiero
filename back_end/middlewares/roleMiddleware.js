const authorize = (rolesPermitidos = []) => {
  return (req, res, next) => {
    // 1. Verificar que el usuario pasó primero por authMiddleware
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado. Por favor, inicia sesión." });
    }

    // 2. Obtener el nombre del rol del token decodificado (en minúsculas)
    const userRole = req.user.rol ? req.user.rol.toLowerCase() : null;

    // 3. Comparar contra los roles permitidos
    const rolesNormalizados = rolesPermitidos.map((r) => r.toLowerCase());

    if (!userRole || !rolesNormalizados.includes(userRole)) {
      return res.status(403).json({
        message: `Acceso denegado. Se requiere uno de estos roles: [${rolesPermitidos.join(", ")}]`,
      });
    }

    // 4. Rol válido → continuar
    next();
  };
};

module.exports = authorize;
