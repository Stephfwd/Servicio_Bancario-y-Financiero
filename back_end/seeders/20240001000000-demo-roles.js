"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        nombre: "admin",
        descripcion: "Administrador del sistema con acceso total",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "cliente",
        descripcion: "Cliente del banco con acceso a sus cuentas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "cajero",
        descripcion: "Cajero con permisos para operar transacciones",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
