"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // define association here
      Group.hasMany(models.Student, {
        foreignKey: "groupId",
        as: "students",
        onDelete: "SET NULL",
        hooks: true, // Cần bật hooks để Sequelize xử lý cascade hoặc set null
      });
      Group.belongsTo(models.Topic, {
        foreignKey: "topicId",
        as: "topic",
      });
    }
  }
  Group.init(
    {
      groupName: DataTypes.STRING,
      topicId: DataTypes.INTEGER,
      numOfMembers: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
