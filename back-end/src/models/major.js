"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    static associate(models) {
      // define association here
      Major.belongsTo(models.Term, {
        foreignKey: "termId",
      });
      Major.hasMany(models.Student);
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
