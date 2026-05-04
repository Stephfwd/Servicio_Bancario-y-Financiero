const { Transaccion, Cuenta, TipoTransaccion, sequelize } = require("../models");

const transferir = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { cuenta_origen_id, cuenta_destino_id, monto, descripcion } = req.body;
    const usuario_id = req.user.id;

    // 1. Validar cuenta origen y saldo
    const cuentaOrigen = await Cuenta.findOne({ 
      where: { id: cuenta_origen_id, usuario_id },
      transaction: t 
    });

    if (!cuentaOrigen) {
      await t.rollback();
      return res.status(404).json({ message: "Cuenta origen no encontrada o no pertenece al usuario" });
    }

    if (parseFloat(cuentaOrigen.saldo) < parseFloat(monto)) {
      await t.rollback();
      return res.status(400).json({ message: "Saldo insuficiente" });
    }

    // 2. Validar cuenta destino
    const cuentaDestino = await Cuenta.findByPk(cuenta_destino_id, { transaction: t });
    if (!cuentaDestino) {
      await t.rollback();
      return res.status(404).json({ message: "Cuenta destino no encontrada" });
    }

    // 3. Realizar el movimiento de saldos
    cuentaOrigen.saldo = parseFloat(cuentaOrigen.saldo) - parseFloat(monto);
    cuentaDestino.saldo = parseFloat(cuentaDestino.saldo) + parseFloat(monto);

    await cuentaOrigen.save({ transaction: t });
    await cuentaDestino.save({ transaction: t });

    // 4. Registrar la transacción
    const nuevaTransaccion = await Transaccion.create({
      cuenta_origen_id,
      cuenta_destino_id,
      monto,
      descripcion,
      tipo_transaccion_id: 3, // Asumiendo que 3 es 'Transferencia'
      estado: "completada"
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      message: "Transferencia realizada con éxito",
      transaccion: nuevaTransaccion
    });

  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al realizar la transferencia", error: error.message });
  }
};

const getHistorial = async (req, res) => {
  try {
    const { cuenta_id } = req.params;
    const usuario_id = req.user.id;

    // Verificar que la cuenta pertenece al usuario
    const cuenta = await Cuenta.findOne({ where: { id: cuenta_id, usuario_id } });
    if (!cuenta) {
      return res.status(403).json({ message: "Acceso denegado a esta cuenta" });
    }

    const transacciones = await Transaccion.findAll({
      where: {
        [sequelize.Sequelize.Op.or]: [
          { cuenta_origen_id: cuenta_id },
          { cuenta_destino_id: cuenta_id }
        ]
      },
      include: [
        { model: TipoTransaccion, as: "tipo_transaccion" },
        { model: Cuenta, as: "cuenta_origen", attributes: ['numero_cuenta'] },
        { model: Cuenta, as: "cuenta_destino", attributes: ['numero_cuenta'] }
      ],
      order: [['fecha', 'DESC']]
    });

    res.json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener historial", error: error.message });
  }
};

module.exports = {
  transferir,
  getHistorial
};
