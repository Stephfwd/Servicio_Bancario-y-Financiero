"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tipo_transacciones", [
      {
        id: 1,
        nombre: "deposito",
        descripcion: "Ingreso de dinero a una cuenta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "retiro",
        descripcion: "Extracción de dinero de una cuenta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "transferencia",
        descripcion: "Movimiento de dinero entre cuentas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tipo_transacciones", null, {});
  },
};
