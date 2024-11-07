'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.ENUM,
        values: ["Mr.", "Mrs.", "Ms.", "Dr.", "The", "Sri", "Prof.", "Master", "M/s.", "Kumari", "Sir", "Shri"],
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      alternate_email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$/i,
        }
      },
      alternate_mobile: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$/i,
        }
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      anniversary_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true
      },
      area: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};