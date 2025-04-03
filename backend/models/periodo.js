'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Periodo extends Model {
    static associate(models) {
      // Relación uno a muchos: Un Periodo tiene muchas Metas
      Periodo.hasMany(models.Meta, { foreignKey: 'id_periodo', as: 'metas' });
    }
  }

  // Inicialización del modelo Periodo
  Periodo.init({
    id_periodo: { // Clave primaria
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del periodo es obligatorio'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Periodo',  // Nombre del modelo en Sequelize
    tableName: 'Periodos'  // Debe coincidir con la migración
  });

  return Periodo;
};
