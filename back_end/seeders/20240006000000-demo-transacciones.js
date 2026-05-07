"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("transacciones", [
      {
        id: 1,
        cuenta_origen_id: null,    // depósito: no tiene origen externo
        cuenta_destino_id: 1,      // → cuenta de María (ahorros)
        tipo_transaccion_id: 1,    // deposito
        monto: 1000.00,
        descripcion: "Depósito inicial",
        estado: "completada",
        fecha: new Date("2024-01-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        cuenta_origen_id: 1,       // María (ahorros) → José (ahorros)
        cuenta_destino_id: 3,
        tipo_transaccion_id: 3,    // transferencia
        monto: 500.00,
        descripcion: "Pago de deuda",
        estado: "completada",
        fecha: new Date("2024-01-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        cuenta_origen_id: 3,       // José retira de su cuenta
        cuenta_destino_id: null,
        tipo_transaccion_id: 2,    // retiro
        monto: 200.00,
        descripcion: "Retiro en cajero",
        estado: "completada",
        fecha: new Date("2024-01-20"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transacciones", null, {});
  },
};
