'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Periodos',
          key: 'periodoId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      objetivo: {
        type: Sequelize.STRING
      },
      monto: {
        type: Sequelize.DOUBLE
      },
      fecha: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meta');
  }
};