const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const validateRequest = require("../middlewares/validatorMiddleware");
const { userSchema, updateUserSchema } = require("../utils/validators");

// Todas las rutas aquí requieren token válido
router.use(verifyToken);

// --- Rutas de Usuarios (Admins y Super Admins) ---
router.get("/users", authorize(['admin', 'super_admin']), adminController.getAllUsers);
router.post("/users", authorize(['admin', 'super_admin']), validateRequest(userSchema), adminController.createUser);
router.put("/users/:id", authorize(['admin', 'super_admin']), validateRequest(updateUserSchema), adminController.updateUser);
router.delete("/users/:id", authorize(['admin', 'super_admin']), adminController.deleteUser);

// --- Rutas de Roles (Solo Super Admin) ---
router.get("/roles", authorize(['super_admin']), adminController.getAllRoles);
router.post("/roles", authorize(['super_admin']), adminController.createRole);

module.exports = router;
