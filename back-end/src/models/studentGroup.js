"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentGroup extends Model {
    static associate(models) {
      StudentGroup.belongsTo(models.Student, {
        foreignKey: "studentId",
        as: "students",
        onDelete: "CASCADE",
      });
      StudentGroup.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: "groups",
        onDelete: "CASCADE",
      });
    }
  }

  StudentGroup.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Students", key: "id" },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Groups", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "StudentGroup",
      tableName: "StudentGroups",
      timestamps: false,
    }
  );

  return StudentGroup;
};
