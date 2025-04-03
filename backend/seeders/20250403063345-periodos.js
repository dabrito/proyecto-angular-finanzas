'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertamos datos en la tabla 'Periodos'
    await queryInterface.bulkInsert('Periodos', [
      {
        nombre: 'Diario',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Semanal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Quincenal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Mensual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Semestral',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Anual',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los registros de la tabla 'Periodos'
    await queryInterface.bulkDelete('Periodos', null, {});
  }
};
