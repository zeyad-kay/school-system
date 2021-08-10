module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Student', {
      StudentNationalId: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
          isNumeric: true,
          len: [14, 14]
        }
      },
      StudentName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      StudentBirthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      StudentBirthGovernorateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      StudentBirthDistrictId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      StudentAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      StudentSex: {
        type: Sequelize.ENUM,
        values: ["MALE", "FEMALE"],
        allowNull: false
      },
      StudentReligion: {
        type: Sequelize.ENUM,
        values: ["MUSLIM", "JEW", "CHRISTIAN"],
        allowNull: false
      },
      StudentRegisterDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      StudentSiblingOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      StudentFatherNationalId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [14, 14]
        }
      },
      StudentMotherNationalId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [14, 14]
        }
      },
      ClassId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      StudentBusRouteId: Sequelize.INTEGER,
      IsFullBusRoute: Sequelize.BOOLEAN,
      IsRegistered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      RemainingCost: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Student');
  }
};