"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cuentas", [
      {
        id: 1,
        usuario_id: 2, // María
        tipo_cuenta_id: 1, // ahorros
        numero_cuenta: "SV-0001-0001-0001",
        saldo: 5000.00,
        estado: "activa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        usuario_id: 2, // María
        tipo_cuenta_id: 2, // corriente
        numero_cuenta: "SV-0001-0002-0001",
        saldo: 1200.50,
        estado: "activa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        usuario_id: 3, // José
        tipo_cuenta_id: 1, // ahorros
        numero_cuenta: "SV-0001-0001-0002",
        saldo: 3500.00,
        estado: "activa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cuentas", null, {});
  },
};
