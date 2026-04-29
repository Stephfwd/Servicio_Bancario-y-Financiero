"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tarjetas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cuenta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cuentas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      numero_tarjeta: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cvv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("debito", "credito"),
        allowNull: false,
      },
      fecha_vencimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.ENUM("activa", "bloqueada"),
        allowNull: false,
        defaultValue: "activa",
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
    await queryInterface.dropTable("tarjetas");
  },
};
