import bcrypt from "bcryptjs";
import db from "../models/index";
import _ from "lodash";
const Role = db.Role;
const Permission = db.Permission;
const getRoleWithId = async (user) => {
  try {
    const role = await Role.findOne({
      where: { id: user.roleId },
      attributes: ["id", "name", "description"],
      include: {
        model: Permission,
        attributes: ["id", "apiPath", "description"],
        through: { attributes: [] },
      },
    });
    if (role) {
      return role;
    } else {
      return {
        status: -1,
        data: null,
        message: "Get permissions fail!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: -1,
      data: null,
      message: "Error from server!",
    };
  }
};
module.exports = {
  getRoleWithId,
};
