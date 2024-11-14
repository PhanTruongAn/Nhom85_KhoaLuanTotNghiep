import bcrypt from "bcryptjs";
import db from "../models/index";
import _ from "lodash";
const Role = db.Role;
const Permission = db.Permission;
const getRoleWithId = async (id) => {
  try {
    const role = await Role.findOne({
      where: { id: id },
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

const getRolesForLecturer = async () => {
  const list = await Role.findAll({
    attributes: ["id", "name", "description"],
  });
  const filterData = list.filter((list) => list.name !== "STUDENT");
  if (list && list.length > 0) {
    return {
      status: 0,
      message: "Lấy danh sách thành công!",
      data: filterData,
    };
  }
  return {
    status: -1,
    message: "Lấy danh sách thất bại!",
    data: list,
  };
};
module.exports = {
  getRoleWithId,
  getRolesForLecturer,
};
