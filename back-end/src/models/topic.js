"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      // define association here
      Topic.hasMany(models.Group);
      Topic.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        as: "lecturer",
      });
      Topic.belongsTo(models.Term, {
        foreignKey: "termId",
        as: "term",
      });
    }
  }
  Topic.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      goals: DataTypes.TEXT,
      requirement: DataTypes.TEXT,
      standardOutput: DataTypes.TEXT,
      status: DataTypes.STRING,
      quantityGroup: DataTypes.INTEGER,
      lecturerId: DataTypes.INTEGER,
      termId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
