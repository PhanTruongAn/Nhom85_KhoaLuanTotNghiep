"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
    }
  }
  Notification.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      termId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
