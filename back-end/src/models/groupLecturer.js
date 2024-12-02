"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupLecturer extends Model {
    static associate(models) {
      // define association here
      GroupLecturer.hasMany(models.Lecturer, {
        foreignKey: "groupLecturerId",
        as: "lecturers",
        onDelete: "SET NULL",
        hooks: true,
      });
      GroupLecturer.hasMany(models.Group, {
        foreignKey: "groupLecturerId",
        onDelete: "SET NULL",
        hooks: true,
        as: "reviewGroups",
      });
      GroupLecturer.hasMany(models.Evaluation, {
        foreignKey: "groupLecturerId",
        onDelete: "CASCADE",
      });
      GroupLecturer.belongsTo(models.Term, {
        foreignKey: "termId",
        onDelete: "CASCADE",
      });
    }
  }
  GroupLecturer.init(
    {
      name: DataTypes.STRING,
      numOfMembers: DataTypes.INTEGER,
      termId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GroupLecturer",
    }
  );
  return GroupLecturer;
};
