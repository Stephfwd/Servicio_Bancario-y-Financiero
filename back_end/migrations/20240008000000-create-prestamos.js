"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("prestamos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      monto_solicitado: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      monto_aprobado: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      tasa_interes: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      plazo_meses: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM("pendiente", "aprobado", "rechazado"),
        allowNull: false,
        defaultValue: "pendiente",
      },
      fecha_aprobacion: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_vencimiento: {
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
    await queryInterface.dropTable("prestamos");
  },
};
