"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsToMany(models.Role, {
        through: "NoteRole",
        foreignKey: "noteId",
        as: "roles",
        onDelete: "CASCADE",
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
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
