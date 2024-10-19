"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: "RolePermission",
        foreignKey: "permissionId",
      });
    }
  }
  Permission.init(
    {
      apiPath: DataTypes.STRING,
      description: DataTypes.STRING,
      method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
