const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validatorMiddleware");
const { userSchema, loginSchema } = require("../utils/validators");

router.post("/register", validateRequest(userSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/verify", verifyToken, authController.verifySession);

module.exports = router;
