"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.Student, {
        through: "StudentGroup",
        foreignKey: "groupId",
        as: "students",
        onDelete: "CASCADE",
      });
      // Group.hasMany(models.StudentGroup, {
      //   foreignKey: "groupId",
      //   as: "studentGroups",
      //   onDelete: "CASCADE",
      // });
      Group.belongsTo(models.Topic, {
        foreignKey: "topicId",
        as: "topic",
      });
      Group.hasOne(models.Evaluation, {
        foreignKey: "groupId",
        as: "evaluation",
        onDelete: "CASCADE",
      });
      Group.belongsTo(models.GroupLecturer, {
        foreignKey: "groupLecturerId",
        as: "reviewGroupLecturer",
        onDelete: "SET NULL",
      });
      Group.belongsTo(models.Term, {
        foreignKey: "termId",
        as: "term",
      });
    }
  }

  Group.init(
    {
      groupName: DataTypes.STRING,
      topicId: DataTypes.INTEGER,
      numOfMembers: DataTypes.INTEGER,
      status: DataTypes.STRING,
      groupLecturerId: DataTypes.INTEGER,
      termId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );

  return Group;
};
