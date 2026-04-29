"use strict";

module.exports = (sequelize, DataTypes) => {
  const Tarjeta = sequelize.define(
    "Tarjeta",
    {
      cuenta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numero_tarjeta: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM("debito", "credito"),
        allowNull: false,
      },
      fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM("activa", "bloqueada"),
        defaultValue: "activa",
      },
    },
    {
      tableName: "tarjetas",
    }
  );

  Tarjeta.associate = (models) => {
    Tarjeta.belongsTo(models.Cuenta, {
      foreignKey: "cuenta_id",
      as: "cuenta",
    });
  };

  return Tarjeta;
};
