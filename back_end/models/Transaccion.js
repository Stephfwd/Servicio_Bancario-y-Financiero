"use strict";

module.exports = (sequelize, DataTypes) => {
  const Transaccion = sequelize.define(
    "Transaccion",
    {
      cuenta_origen_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cuenta_destino_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tipo_transaccion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      descripcion: DataTypes.STRING,
      estado: {
        type: DataTypes.ENUM("pendiente", "completada", "fallida"),
        defaultValue: "pendiente",
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "transacciones",
    }
  );

  Transaccion.associate = (models) => {
    Transaccion.belongsTo(models.Cuenta, {
      foreignKey: "cuenta_origen_id",
      as: "cuenta_origen",
    });
    Transaccion.belongsTo(models.Cuenta, {
      foreignKey: "cuenta_destino_id",
      as: "cuenta_destino",
    });
    Transaccion.belongsTo(models.TipoTransaccion, {
      foreignKey: "tipo_transaccion_id",
      as: "tipo_transaccion",
    });
  };

  return Transaccion;
};
