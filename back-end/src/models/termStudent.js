"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TermStudent extends Model {
    static associate(models) {
      TermStudent.belongsTo(models.Student, {
        foreignKey: "studentId",
        onDelete: "CASCADE",
      });

      TermStudent.belongsTo(models.Term, {
        foreignKey: "termId",
        onDelete: "CASCADE",
      });
    }
  }

  TermStudent.init(
    {
      termId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TermStudent",
    }
  );

  return TermStudent;
};
