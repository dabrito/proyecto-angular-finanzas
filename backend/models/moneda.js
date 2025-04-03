'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Moneda = sequelize.define('Moneda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'monedas',
    timestamps: false
  });

  return Moneda;
};
