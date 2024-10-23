"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    static associate(models) {
      // define association here
      Major.hasMany(models.Student);
    }
  }
  Major.init(
    {
      majorName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Major",
    }
  );
  return Major;
};
