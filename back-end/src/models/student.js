"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Major, {
        foreignKey: "majorId",
        as: "major",
      });
      Student.belongsTo(models.Role, {
        foreignKey: "roleId",
      });

      // Mối quan hệ với Term thông qua TermStudent
      Student.belongsToMany(models.Term, {
        through: "TermStudent",
        foreignKey: "studentId",
        as: "terms",
      });

      // Mối quan hệ với Group thông qua StudentGroup
      Student.belongsToMany(models.Group, {
        through: "StudentGroup",
        foreignKey: "studentId",
        as: "groups",
        onDelete: "CASCADE",
      });
    }
  }

  Student.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      isLeader: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      className: DataTypes.STRING,
      typeTraining: DataTypes.STRING,
      majorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Student",
    }
  );

  return Student;
};
