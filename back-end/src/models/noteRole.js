"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NoteRole extends Model {
    static associate(models) {
      NoteRole.belongsTo(models.Role, {
        foreignKey: "roleId",
        onDelete: "CASCADE",
      });

      NoteRole.belongsTo(models.Note, {
        foreignKey: "noteId",
        onDelete: "CASCADE",
      });
    }
  }

  NoteRole.init(
    {
      roleId: DataTypes.INTEGER,
      noteId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "NoteRole",
    }
  );

  return NoteRole;
};
