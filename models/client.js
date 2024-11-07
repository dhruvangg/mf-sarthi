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
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};