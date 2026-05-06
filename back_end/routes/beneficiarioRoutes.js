const express = require("express");
const router = express.Router();
const beneficiarioController = require("../controllers/beneficiarioController");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// [cliente, admin] → Ver mis beneficiarios
router.get("/", verifyToken, authorize(["cliente", "admin"]), beneficiarioController.getMisBeneficiarios);
// [cliente] → Agregar un beneficiario
router.post("/", verifyToken, authorize(["cliente"]), beneficiarioController.addBeneficiario);
// [cliente] → Eliminar un beneficiario
router.delete("/:id", verifyToken, authorize(["cliente"]), beneficiarioController.deleteBeneficiario);

module.exports = router;
