'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ConversionHistorial = sequelize.define('ConversionHistorial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    monto_origen: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    moneda_origen: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    moneda_destino: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    monto_convertido: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    tasa_conversion: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'conversion_historial',
    timestamps: false
  });

  return ConversionHistorial;
};
