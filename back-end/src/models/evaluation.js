"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    static associate(models) {
      Evaluation.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: "group",
      });
    }
  }
  Evaluation.init(
    {
      discussionPoint: DataTypes.INTEGER,
      progressPoint: DataTypes.INTEGER,
      reportingPoint: DataTypes.INTEGER,
      averagePoint: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      groupId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Evaluation",
    }
  );
  return Evaluation;
};
