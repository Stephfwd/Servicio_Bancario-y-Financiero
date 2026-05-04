const { Tarjeta, Cuenta } = require("../models");

const getMisTarjetas = async (req, res) => {
  try {
    const usuario_id = req.user.id;

    const tarjetas = await Tarjeta.findAll({
      include: [
        {
          model: Cuenta,
          as: "cuenta",
          where: { usuario_id },
          attributes: ["numero_cuenta", "saldo"]
        }
      ]
    });

    res.json(tarjetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tarjetas", error: error.message });
  }
};

const solicitarTarjeta = async (req, res) => {
  try {
    const { cuenta_id, tipo } = req.body;
    const usuario_id = req.user.id;

    // Verificar que la cuenta pertenece al usuario
    const cuenta = await Cuenta.findOne({ where: { id: cuenta_id, usuario_id } });
    if (!cuenta) {
      return res.status(403).json({ message: "La cuenta no pertenece al usuario" });
    }

    // Generar datos ficticios para la tarjeta
    const numero_tarjeta = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const fecha_vencimiento = new Date();
    fecha_vencimiento.setFullYear(fecha_vencimiento.getFullYear() + 4); // 4 años de validez

    const nuevaTarjeta = await Tarjeta.create({
      cuenta_id,
      numero_tarjeta,
      cvv,
      tipo,
      fecha_vencimiento,
      estado: "activa"
    });

    res.status(201).json({
      message: "Tarjeta generada exitosamente",
      tarjeta: nuevaTarjeta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al solicitar tarjeta", error: error.message });
  }
};

const cambiarEstadoTarjeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // 'activa' o 'bloqueada'
    const usuario_id = req.user.id;

    const tarjeta = await Tarjeta.findByPk(id, {
      include: [{ model: Cuenta, as: "cuenta", where: { usuario_id } }]
    });

    if (!tarjeta) {
      return res.status(404).json({ message: "Tarjeta no encontrada" });
    }

    await tarjeta.update({ estado });

    res.json({ message: `Tarjeta ${estado} correctamente`, tarjeta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar estado de tarjeta", error: error.message });
  }
};

module.exports = {
  getMisTarjetas,
  solicitarTarjeta,
  cambiarEstadoTarjeta
};
