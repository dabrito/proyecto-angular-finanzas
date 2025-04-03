'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo extends Model {
    static associate(models) {
      tipo.hasMany(models.Transaccion, { foreignKey: 'tiposId', as: 'transacciones', });
    }
  }
  tipo.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo',
  });
  return tipo;
};