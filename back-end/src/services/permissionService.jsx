import db from "../models/index";
import _ from "lodash";
const { Op } = require("sequelize");

const Permission = db.Permission;

const paginationPermission = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Permission.findAndCountAll({
      attributes: ["id", "apiPath", "description", "method"],
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: 0,
      message: "Lấy danh sách thành công!",
      data: {
        totalRows: count,
        totalPages: totalPages,
        permissions: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: "Lấy danh sách thất bại!",
      data: null,
    };
  }
};

const getAllPermission = async () => {
  const list = await Permission.findAll({
    attributes: ["id", "apiPath", "description", "method"],
  });
  if (list && list.length > 0) {
    return {
      status: 0,
      message: "Lấy danh sách thành công!",
      data: list,
    };
  }
  return {
    status: -1,
    message: "Lấy danh sách thất bại!",
    data: list,
  };
};
module.exports = {
  paginationPermission,
  getAllPermission,
};
