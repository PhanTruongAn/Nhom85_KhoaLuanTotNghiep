"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Major.belongsTo(models.Term, {
        foreignKey: "termId",
      });
      Major.hasMany(models.Lecturer);
    }
  }
  Major.init(
    {
      majorName: DataTypes.STRING,
      termId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Major",
    }
  );
  return Major;
};
