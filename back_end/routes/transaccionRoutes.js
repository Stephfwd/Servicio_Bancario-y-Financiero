const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/transferir", authMiddleware, transaccionController.transferir);
router.get("/historial/:cuenta_id", authMiddleware, transaccionController.getHistorial);

module.exports = router;
