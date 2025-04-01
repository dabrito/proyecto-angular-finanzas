'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transaccions', [
      {
        type: 'ingreso',
        amount: 1200,
        date: new Date('2024-01-05'),
        categoryId: 1, // Sueldo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'gasto',
        amount: 45.5,
        date: new Date('2024-01-06'),
        categoryId: 2, // Comida
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'gasto',
        amount: 15.0,
        date: new Date('2024-01-07'),
        categoryId: 3, // Transporte
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'gasto',
        amount: 200,
        date: new Date('2024-01-08'),
        categoryId: 4, // Educación
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'ingreso',
        amount: 300,
        date: new Date('2024-01-09'),
        categoryId: 1, // Sueldo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'gasto',
        amount: 80,
        date: new Date('2024-01-10'),
        categoryId: 5, // Entretenimiento
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transaccions', null, {});
  }
};
