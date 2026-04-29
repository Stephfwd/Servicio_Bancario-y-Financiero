"use strict";

module.exports = (sequelize, DataTypes) => {
  const TipoCuenta = sequelize.define(
    "TipoCuenta",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "tipo_cuentas",
    }
  );

  TipoCuenta.associate = (models) => {
    TipoCuenta.hasMany(models.Cuenta, {
      foreignKey: "tipo_cuenta_id",
      as: "cuentas",
    });
  };

  return TipoCuenta;
};
