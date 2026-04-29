"use strict";

module.exports = (sequelize, DataTypes) => {
  const Prestamo = sequelize.define(
    "Prestamo",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monto_solicitado: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      monto_aprobado: DataTypes.DECIMAL(12, 2),
      tasa_interes: DataTypes.DECIMAL(5, 2),
      plazo_meses: DataTypes.INTEGER,
      estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"),
        defaultValue: "pendiente",
      },
      fecha_aprobacion: DataTypes.DATE,
      fecha_vencimiento: DataTypes.DATE,
    },
    {
      tableName: "prestamos",
    }
  );

  Prestamo.associate = (models) => {
    Prestamo.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
  };

  return Prestamo;
};
