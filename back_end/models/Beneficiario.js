"use strict";

module.exports = (sequelize, DataTypes) => {
  const Beneficiario = sequelize.define(
    "Beneficiario",
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_cuenta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      banco: DataTypes.STRING,
      alias: DataTypes.STRING,
    },
    {
      tableName: "beneficiarios",
    }
  );

  Beneficiario.associate = (models) => {
    Beneficiario.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
  };

  return Beneficiario;
};
