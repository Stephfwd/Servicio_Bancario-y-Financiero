"use strict";

module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    "Rol",
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
      tableName: "roles",
    }
  );

  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, {
      foreignKey: "rol_id",
      as: "usuarios",
    });
  };

  return Rol;
};
