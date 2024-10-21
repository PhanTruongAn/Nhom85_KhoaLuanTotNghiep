"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "SET NULL",
      });
      Student.belongsTo(models.Major, {
        foreignKey: "majorId",
      });
      Student.hasMany(models.Notification);
      Student.belongsTo(models.Role, {
        foreignKey: "roleId",
        // foreignKeyConstraint: true,
      });
      Student.belongsToMany(models.Term, {
        through: "TermStudent",
        foreignKey: "studentId",
        onDelete: "CASCADE",
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
