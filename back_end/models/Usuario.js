"use strict";

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: DataTypes.STRING,
      dui: DataTypes.STRING,
      estado: {
        type: DataTypes.ENUM("activo", "inactivo"),
        defaultValue: "activo",
      },
    },
    {
      tableName: "usuarios",
    }
  );

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Rol, {
      foreignKey: "rol_id",
      as: "rol",
    });
    Usuario.hasMany(models.Cuenta, {
      foreignKey: "usuario_id",
      as: "cuentas",
    });
    Usuario.hasMany(models.Prestamo, {
      foreignKey: "usuario_id",
      as: "prestamos",
    });
    Usuario.hasMany(models.Beneficiario, {
      foreignKey: "usuario_id",
      as: "beneficiarios",
    });
  };

  return Usuario;
};
