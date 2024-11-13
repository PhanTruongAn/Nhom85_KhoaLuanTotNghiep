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
    }
  }
  Evaluation.init(
    {
      discussionPoint: DataTypes.DOUBLE,
      progressPoint: DataTypes.DOUBLE,
      reportingPoint: DataTypes.DOUBLE,
      averagePoint: DataTypes.DOUBLE,
      noteAdvisorLecturer: DataTypes.STRING,
      noteReviewLecturer: DataTypes.STRING,
      groupId: DataTypes.STRING,
      termId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Evaluation",
    }
  );
  return Evaluation;
};
