'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos', [
      { nombre: 'ingreso', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'gasto', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos', null, {});
  }
};
