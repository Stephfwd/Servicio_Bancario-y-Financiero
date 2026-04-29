"use strict";

module.exports = (sequelize, DataTypes) => {
  const TipoTransaccion = sequelize.define(
    "TipoTransaccion",
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
      tableName: "tipo_transacciones",
    }
  );

  TipoTransaccion.associate = (models) => {
    TipoTransaccion.hasMany(models.Transaccion, {
      foreignKey: "tipo_transaccion_id",
      as: "transacciones",
    });
  };

  return TipoTransaccion;
};
