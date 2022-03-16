const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParentJob extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
      ParentJob.belongsTo(models["Parent"], {
        foreignKey: "ParentId"
      });
      ParentJob.belongsTo(models["Job"], {
        foreignKey: "ParentJobId",
      });
    }
  }
  ParentJob.init({
    ParentId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ParentJobId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ParentJobAddress: {
      type: DataTypes.STRING,
    },
    ParentJobDescription: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    modelName: "ParentJob",
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["ParentJobId","ParentId"]
      },
    ]
  });
  return ParentJob;
};