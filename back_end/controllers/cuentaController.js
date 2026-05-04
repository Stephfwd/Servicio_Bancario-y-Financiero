const { Cuenta, TipoCuenta, Usuario } = require("../models");

const getMisCuentas = async (req, res) => {
  try {
    const usuario_id = req.user.id; // Asumiendo que el ID viene del token decodificado
    
    const cuentas = await Cuenta.findAll({
      where: { usuario_id },
      include: [{ model: TipoCuenta, as: "tipo_cuenta" }]
    });

    res.json(cuentas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las cuentas", error: error.message });
  }
};

const createCuenta = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { tipo_cuenta_id } = req.body;

    // Generar un número de cuenta aleatorio de 10 dígitos (ejemplo)
    const numero_cuenta = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const nuevaCuenta = await Cuenta.create({
      usuario_id,
      tipo_cuenta_id,
      numero_cuenta,
      saldo: 0.0,
      estado: "activa"
    });

    res.status(201).json({
      message: "Cuenta creada exitosamente",
      cuenta: nuevaCuenta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la cuenta", error: error.message });
  }
};

const getCuentaDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const cuenta = await Cuenta.findOne({
      where: { id, usuario_id },
      include: [{ model: TipoCuenta, as: "tipo_cuenta" }]
    });

    if (!cuenta) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    res.json(cuenta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener detalle de cuenta", error: error.message });
  }
};

module.exports = {
  getMisCuentas,
  createCuenta,
  getCuentaDetalle
};
