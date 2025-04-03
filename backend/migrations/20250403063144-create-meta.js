'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meta', {
      id_meta: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_periodo: { // Clave foránea
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Periodos', // Nombre correcto de la tabla referenciada
          key: 'id_periodo'
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
