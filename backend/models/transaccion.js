'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaccion extends Model {
    static associate(models) {
      Transaccion.belongsTo(models.Categoria, { foreignKey: 'categoryId', as: 'categoria', });
      Transaccion.belongsTo(models.tipo, { foreignKey: 'tiposId', as: 'tipo', });
    }
  }
  Transaccion.init({
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    tiposId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Transaccion',
  });
  return Transaccion;
};