import db from "../models/index";
import _ from "lodash";
import permissionValid from "../validates/permissionValidate";
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

const createPermission = async (data) => {
  const isValidInput = await permissionValid.checkInput(data);
  if (isValidInput.status === 1) {
    return isValidInput;
  } else {
    const res = await Permission.create(data);
    if (res) {
      return {
        status: 0,
        message: "Tạo mới quyền hạn thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Tạo mới quyền hạn thành công!",
      };
    }
  }
};

const updatePermission = async (data) => {
  if (data) {
    const res = await Permission.update(
      {
        apiPath: data.apiPath,
        description: data.description,
        method: data.method,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
    if (res) {
      return {
        status: 0,
        message: "Cập nhật quyền hạn thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Cập nhật quyền hạn thất bại!",
      };
    }
  } else {
    return {
      status: -1,
      message: "Dữ liệu cập nhật không đúng!",
    };
  }
};

const deletePermission = async (data) => {
  if (data.id) {
    try {
      const res = await Permission.destroy({
        where: {
          id: data.id,
        },
      });
      if (res) {
        return {
          status: 0,
          message: "Xóa quyền hạn thành công!",
        };
      } else {
        return {
          status: 0,
          message: "Không tìm thấy quyền hạn cần xóa!",
        };
      }
    } catch (error) {
      return {
        status: 1,
        message: "Lỗi khi xóa quyền hạn: " + error.message,
      };
    }
  } else {
    return {
      status: -1,
      message: "Id quyền hạn không hợp lệ!",
    };
  }
};
module.exports = {
  paginationPermission,
  getAllPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
