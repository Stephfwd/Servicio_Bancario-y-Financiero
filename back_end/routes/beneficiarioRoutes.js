const express = require("express");
const router = express.Router();
const beneficiarioController = require("../controllers/beneficiarioController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, beneficiarioController.getMisBeneficiarios);
router.post("/", authMiddleware, beneficiarioController.addBeneficiario);
router.delete("/:id", authMiddleware, beneficiarioController.deleteBeneficiario);

module.exports = router;
