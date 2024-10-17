"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const TermStudent = sequelize.define("TermStudent", {
    termId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Terms",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Students",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return TermStudent;
};
