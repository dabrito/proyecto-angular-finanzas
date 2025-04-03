'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertamos datos en la tabla 'Metas'
    await queryInterface.bulkInsert('Meta', [
      {
        objetivo: 'Comprar un carro',
        monto: 15000,
        fecha: '2025-12-31',
        id_periodo: 1, // Asume que tienes un periodo con ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        objetivo: 'Ahorrar para la casa',
        monto: 25000,
        fecha: '2026-06-30',
        id_periodo: 2, // Asume que tienes un periodo con ID 2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        objetivo: 'Ir de viaje a Europa',
        monto: 5000,
        fecha: '2025-08-20',
        id_periodo: 3, // Asume que tienes un periodo con ID 3
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los registros de la tabla 'Metas'
    await queryInterface.bulkDelete('Meta', null, {});
  }
};
