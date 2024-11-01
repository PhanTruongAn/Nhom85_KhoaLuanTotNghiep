"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // Các mối quan hệ khác
      Student.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "SET NULL",
      });
      Student.belongsTo(models.Major, {
        foreignKey: "majorId",
        as: "major",
      });
      Student.belongsTo(models.Role, {
        foreignKey: "roleId",
      });

      // Mối quan hệ với TermStudent
      Student.belongsToMany(models.Term, {
        through: "TermStudent",
        foreignKey: "studentId",
        as: "terms",
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
      groupId: DataTypes.INTEGER,
      majorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Student",
    }
  );

  return Student;
};
