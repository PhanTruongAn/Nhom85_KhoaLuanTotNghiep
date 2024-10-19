"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Permission, {
        through: "RolePermission",
        foreignKey: "roleId",
      });
      Role.hasMany(models.Student);
      Role.hasMany(models.Lecturer);
      Role.hasMany(models.Notification);
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
