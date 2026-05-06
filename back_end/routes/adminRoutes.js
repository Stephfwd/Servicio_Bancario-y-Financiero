const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validatorMiddleware");
const { userSchema } = require("../utils/validators");

// Todas las rutas aquí requieren token válido Y rol de administrador
router.use(verifyToken);
router.use(isAdmin);

// --- Rutas de Usuarios ---
router.get("/users", adminController.getAllUsers);
router.post("/users", validateRequest(userSchema), adminController.createUser); // Agregar usuario con validación
router.put("/users/:id", validateRequest(userSchema), adminController.updateUser); // Actualizar usuario con validación
router.delete("/users/:id", adminController.deleteUser); // Eliminar usuario

// --- Rutas de Roles ---
router.get("/roles", adminController.getAllRoles);
router.post("/roles", adminController.createRole);

module.exports = router;
