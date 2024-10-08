"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topic.hasMany(models.Group);
      Topic.belongsTo(models.Lecturer, {
        foreignKey: "lecturerId",
        as: "lecturer",
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
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
