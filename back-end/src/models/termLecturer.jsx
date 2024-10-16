"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const TermLecturer = sequelize.define("TermLecturer", {
    termId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Terms",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    lecturerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Lecturers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return TermLecturer;
};
