"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transacciones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cuenta_origen_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cuentas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cuenta_destino_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cuentas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tipo_transaccion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tipo_transacciones",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      monto: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM("pendiente", "completada", "fallida"),
        allowNull: false,
        defaultValue: "pendiente",
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transacciones");
  },
};
