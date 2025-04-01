'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaccion extends Model {
    static associate(models) {
      Transaccion.belongsTo(models.Categoria, { foreignKey: 'categoryId', as: 'categoria', });
    }
  }
  Transaccion.init({
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaccion',
  });
  return Transaccion;
};