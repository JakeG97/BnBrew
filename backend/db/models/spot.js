'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {as: 'Owner', foreignKey: 'ownerId'});
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId',  onDelete: 'CASCADE'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'});
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id' 
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 300]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 1
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};