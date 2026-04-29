"use strict";

module.exports = (sequelize, DataTypes) => {
  const Cuenta = sequelize.define(
    "Cuenta",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo_cuenta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numero_cuenta: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      saldo: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
        validate: {
          min: 0,
        },
      },
      estado: {
        type: DataTypes.ENUM("activa", "bloqueada", "cerrada"),
        defaultValue: "activa",
      },
    },
    {
      tableName: "cuentas",
    }
  );

  Cuenta.associate = (models) => {
    Cuenta.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
    Cuenta.belongsTo(models.TipoCuenta, {
      foreignKey: "tipo_cuenta_id",
      as: "tipo_cuenta",
    });
    Cuenta.hasMany(models.Tarjeta, {
      foreignKey: "cuenta_id",
      as: "tarjetas",
    });
    // Relaciones para transacciones (como origen y destino)
    Cuenta.hasMany(models.Transaccion, {
      foreignKey: "cuenta_origen_id",
      as: "transacciones_enviadas",
    });
    Cuenta.hasMany(models.Transaccion, {
      foreignKey: "cuenta_destino_id",
      as: "transacciones_recibidas",
    });
  };

  return Cuenta;
};
