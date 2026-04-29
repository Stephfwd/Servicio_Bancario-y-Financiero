"use strict";

// Contraseña de prueba: "123456" hasheada con bcrypt (10 rounds)
const PASSWORD_HASH = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHuu";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usuarios", [
      {
        rol_id: 1, // admin
        nombre: "Carlos",
        apellido: "Ramírez",
        email: "admin@banco.com",
        password: PASSWORD_HASH,
        telefono: "7000-0001",
        dui: "00000001-0",
        estado: "activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rol_id: 2, // cliente
        nombre: "María",
        apellido: "González",
        email: "maria@correo.com",
        password: PASSWORD_HASH,
        telefono: "7000-0002",
        dui: "00000002-0",
        estado: "activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rol_id: 2, // cliente
        nombre: "José",
        apellido: "Martínez",
        email: "jose@correo.com",
        password: PASSWORD_HASH,
        telefono: "7000-0003",
        dui: "00000003-0",
        estado: "activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rol_id: 3, // cajero
        nombre: "Ana",
        apellido: "López",
        email: "cajero@banco.com",
        password: PASSWORD_HASH,
        telefono: "7000-0004",
        dui: "00000004-0",
        estado: "activo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
