'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meta extends Model {
    static associate(models) {
      // Relación con Periodo
      Meta.belongsTo(models.Periodo, { foreignKey: 'id_periodo', as: 'periodo' });
    }
  }

  Meta.init({
    id_meta: { // Clave primaria
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    id_periodo: { // Clave foránea
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Periodos',
        key: 'id_periodo'
      }
    },
    objetivo: {
      type: DataTypes.STRING
    },
    monto: {
      type: DataTypes.DOUBLE
    },
    fecha: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Meta',
    tableName: 'Meta'
  });

  return Meta;
};
