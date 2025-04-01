'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categoria', [
      { nombre: 'Sueldo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Comida', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Transporte', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Educación', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Entretenimiento', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Salud', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categoria', null, {});
  }
};
