"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        id: 1,
        nombre: "super_admin",
        descripcion: "Administrador principal con acceso exclusivo y total",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "cliente",
        descripcion: "Cliente del banco con acceso a sus cuentas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "cajero",
        descripcion: "Cajero con permisos para operar transacciones",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nombre: "admin",
        descripcion: "Administrador normal del sistema",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
