'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meta extends Model {
    static associate(models) {
      Meta.belongsTo(models.Periodo, { foreignKey: 'periodoId', as: 'periodo' });
    }
  }

  Meta.init({
    periodoId: DataTypes.INTEGER,
    objetivo: DataTypes.STRING,
    monto: DataTypes.DOUBLE,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Meta',
  });

  return Meta;
};