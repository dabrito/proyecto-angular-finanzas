'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConversionHistorials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      monto_origen: {
        type: Sequelize.DECIMAL
      },
      moneda_origen: {
        type: Sequelize.STRING
      },
      moneda_destino: {
        type: Sequelize.STRING
      },
      monto_convertido: {
        type: Sequelize.DECIMAL
      },
      tasa_conversion: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('ConversionHistorials');
  }
};