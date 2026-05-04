const { Prestamo } = require("../models");

const getMisPrestamos = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const prestamos = await Prestamo.findAll({ where: { usuario_id } });
    res.json(prestamos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener préstamos", error: error.message });
  }
};

const solicitarPrestamo = async (req, res) => {
  try {
    const { monto_solicitado, plazo_meses } = req.body;
    const usuario_id = req.user.id;

    const nuevoPrestamo = await Prestamo.create({
      usuario_id,
      monto_solicitado,
      plazo_meses,
      estado: "pendiente"
    });

    res.status(201).json({
      message: "Solicitud de préstamo enviada exitosamente",
      prestamo: nuevoPrestamo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al solicitar préstamo", error: error.message });
  }
};

const getPrestamoDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const prestamo = await Prestamo.findOne({ where: { id, usuario_id } });
    if (!prestamo) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json(prestamo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener detalle del préstamo", error: error.message });
  }
};

module.exports = {
  getMisPrestamos,
  solicitarPrestamo,
  getPrestamoDetalle
};
