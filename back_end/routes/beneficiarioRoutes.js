const express = require("express");
const router = express.Router();
const beneficiarioController = require("../controllers/beneficiarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis beneficiarios
router.get("/", authMiddleware, authorize(["cliente", "admin"]), beneficiarioController.getMisBeneficiarios);
// [cliente] → Agregar un beneficiario
router.post("/", authMiddleware, authorize(["cliente"]), beneficiarioController.addBeneficiario);
// [cliente] → Eliminar un beneficiario
router.delete("/:id", authMiddleware, authorize(["cliente"]), beneficiarioController.deleteBeneficiario);

module.exports = router;
