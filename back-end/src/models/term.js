"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    static associate(models) {
      Term.belongsToMany(models.Student, {
        through: "TermStudent",
        foreignKey: "termId",
        onDelete: "CASCADE",
        as: "students",
      });
      Term.belongsToMany(models.Lecturer, {
        through: "TermLecturer",
        foreignKey: "termId",
        onDelete: "CASCADE",
        as: "lecturers",
      });
      Term.hasMany(models.Note, {
        foreignKey: "termId",
        as: "notes",
      });
      Term.hasMany(models.Topic, {
        foreignKey: "termId",
        as: "topics",
      });
      Term.hasMany(models.Evaluation, {
        foreignKey: "termId",
        as: "evaluations",
      });
      Term.hasMany(models.Group, {
        foreignKey: "termId",
        as: "studentGroups",
      });
      Term.hasMany(models.GroupLecturer, {
        foreignKey: "termId",
      });
    }
  }

  Term.init(
    {
      name: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      endChooseGroupDate: DataTypes.DATE,
      endChooseTopicDate: DataTypes.DATE,
      endDiscussionDate: DataTypes.DATE,
      endPublicResultDate: DataTypes.DATE,
      endPublicTopicDate: DataTypes.DATE,
      endReportDate: DataTypes.DATE,
      startChooseGroupDate: DataTypes.DATE,
      startChooseTopicDate: DataTypes.DATE,
      startDiscussionDate: DataTypes.DATE,
      startPublicResultDate: DataTypes.DATE,
      startPublicTopicDate: DataTypes.DATE,
      startReportDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Term",
    }
  );

  return Term;
};
