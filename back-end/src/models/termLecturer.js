"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TermLecturer extends Model {
    static associate(models) {
      TermLecturer.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        onDelete: "CASCADE",
      });

      TermLecturer.belongsTo(models.Term, {
        foreignKey: "termId",
        onDelete: "CASCADE",
      });
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
