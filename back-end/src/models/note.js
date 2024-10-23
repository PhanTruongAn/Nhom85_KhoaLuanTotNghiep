"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      Note.belongsTo(models.Term, {
        foreignKey: "termId",
      });
    }
  }
  Note.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      termId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
