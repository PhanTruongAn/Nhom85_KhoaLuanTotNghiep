"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    static associate(models) {
      // define association here
      Lecturer.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      Lecturer.hasMany(models.Topic, {
        foreignKey: "lecturerId",
        onDelete: "CASCADE",
      });
      Lecturer.belongsToMany(models.Term, {
        through: "TermLecturer",
        foreignKey: "lecturerId",
        onDelete: "CASCADE",
        as: "terms",
      });
      Lecturer.belongsTo(models.GroupLecturer, {
        foreignKey: "groupLecturerId",
        onDelete: "SET NULL",
      });
    }
  }
  Lecturer.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      degree: DataTypes.STRING,
      groupLecturerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lecturer",
    }
  );
  return Lecturer;
};
