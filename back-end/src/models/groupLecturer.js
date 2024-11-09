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
        hooks: true, // Cần bật hooks để Sequelize xử lý cascade hoặc set null
      });
      GroupLecturer.hasMany(models.Group, {
        foreignKey: "groupLecturerId",
        as: "reviewGroups",
      });
      GroupLecturer.belongsTo(models.Term, {
        foreignKey: "termId",
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
