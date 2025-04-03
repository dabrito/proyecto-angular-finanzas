'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transaccions', [
      {
        amount: 1200,
        date: new Date('2024-01-05'),
        categoryId: 1, // Sueldo
        tiposId: 1, // Ingreso
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 45.5,
        date: new Date('2024-01-06'),
        categoryId: 2, // Comida
        tiposId: 2, // Gasto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 15.0,
        date: new Date('2024-01-07'),
        categoryId: 3, // Transporte
        tiposId: 2, // Gasto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 200,
        date: new Date('2024-01-08'),
        categoryId: 4, // Educación
        tiposId: 2, // Gasto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 300,
        date: new Date('2024-01-09'),
        categoryId: 1, // Sueldo
        tiposId: 1, // Ingreso
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        amount: 80,
        date: new Date('2024-01-10'),
        categoryId: 5, // Entretenimiento
        tiposId: 2, // Gasto
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transaccions', null, {});
  }
};
