"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Group, {
        foreignKey: "groupId",
        // foreignKeyConstraint: true,
      });
      Student.belongsTo(models.Major, {
        foreignKey: "majorId",
      });
      Student.hasMany(models.Notification);
      Student.belongsTo(models.Role, {
        foreignKey: "roleId",
        // foreignKeyConstraint: true,
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
      majorName: DataTypes.STRING,
      typeTraining: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
      majorId: DataTypes.INTEGER,
      notifications: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
