"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    static associate(models) {
      Evaluation.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: "group",
      });
      Evaluation.belongsTo(models.Term, {
        foreignKey: "termId",
        as: "term",
      });
      Evaluation.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
      });
      Evaluation.belongsTo(models.GroupLecturer, {
        foreignKey: "groupLecturerId",
      });
    }
  }
  Evaluation.init(
    {
      discussionPoint: DataTypes.DOUBLE,
      progressPoint: DataTypes.DOUBLE,
      reportingPoint: DataTypes.DOUBLE,
      averagePoint: DataTypes.DOUBLE,
      lecturerId: DataTypes.INTEGER,
      groupLecturerId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      termId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Evaluation",
    }
  );
  return Evaluation;
};
