'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    title: {
      type: DataTypes.ENUM,
      values: ["Mr.", "Mrs.", "Ms.", "Dr.", "The", "Sri", "Prof.", "Master", "M/s.", "Kumari", "Sir", "Shri"],
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    alternate_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alternate_mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    anniversary_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address_1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};