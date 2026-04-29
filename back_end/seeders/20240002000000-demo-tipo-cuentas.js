"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tipo_cuentas", [
      {
        nombre: "ahorros",
        descripcion: "Cuenta de ahorros con intereses mensuales",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "corriente",
        descripcion: "Cuenta corriente para operaciones diarias",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "inversion",
        descripcion: "Cuenta de inversión a plazo fijo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tipo_cuentas", null, {});
  },
};
