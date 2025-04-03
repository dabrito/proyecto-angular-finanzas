'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Periodo extends Model {
    static associate(models) {
      Periodo.hasMany(models.Meta, { foreignKey: 'periodoId', as: 'metas' });
    }
  }

  Periodo.init({
    nombre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Periodo',
  });

  return Periodo;
};