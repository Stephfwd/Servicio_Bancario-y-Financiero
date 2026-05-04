const { Beneficiario } = require("../models");

const getMisBeneficiarios = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const beneficiarios = await Beneficiario.findAll({ where: { usuario_id } });
    res.json(beneficiarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener beneficiarios", error: error.message });
  }
};

const addBeneficiario = async (req, res) => {
  try {
    const { nombre, numero_cuenta, banco, alias } = req.body;
    const usuario_id = req.user.id;

    const nuevoBeneficiario = await Beneficiario.create({
      usuario_id,
      nombre,
      numero_cuenta,
      banco,
      alias
    });

    res.status(201).json({
      message: "Beneficiario guardado correctamente",
      beneficiario: nuevoBeneficiario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar beneficiario", error: error.message });
  }
};

const deleteBeneficiario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const beneficiario = await Beneficiario.findOne({ where: { id, usuario_id } });
    if (!beneficiario) {
      return res.status(404).json({ message: "Beneficiario no encontrado" });
    }

    await beneficiario.destroy();

    res.json({ message: "Beneficiario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar beneficiario", error: error.message });
  }
};

module.exports = {
  getMisBeneficiarios,
  addBeneficiario,
  deleteBeneficiario
};
