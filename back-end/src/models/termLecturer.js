"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TermLecturer extends Model {
    static associate(models) {
      // define association here
    }
  }
  TermLecturer.init(
    {
      termId: DataTypes.INTEGER,
      lecturerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TermLecturer",
    }
  );

  return TermLecturer;
};
