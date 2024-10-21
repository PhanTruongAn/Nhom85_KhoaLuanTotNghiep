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
      Lecturer.hasMany(models.Topic);
      Lecturer.belongsToMany(models.Term, {
        through: "TermLecturer",
        foreignKey: "lecturerId",
        onDelete: "CASCADE",
        as: "terms",
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
    },
    {
      sequelize,
      modelName: "Lecturer",
    }
  );
  return Lecturer;
};
