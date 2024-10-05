import db from "../models/index";
import _ from "lodash";
import permissionValid from "../validates/permissionValidate";
const { Op } = require("sequelize");
const { Student, Permission, Group, RolePermission } = require("../models");

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
const findByDescription = async (input) => {
  console.log("Check input>>>>>>>>>>>: ", input);
  if (!input) {
    return {
      status: 1,
      message: "Hãy nhập thông tin cần tìm!",
    };
  }
  const res = await Permission.findAll({
    where: {
      description: {
        [Op.like]: `%${input.toLowerCase()}%`,
      },
    },
    attributes: ["id", "apiPath", "description", "method"],
  });
  if (res) {
    return {
      status: 0,
      message: "Tìm kiếm thành công!",
      data: res,
    };
  } else {
    return {
      status: 0,
      message: "Không tìm thấy dữ liệu nào trùng khớp!",
      data: [],
    };
  }
};

const getRolePermissions = async (data) => {
  if (!data.id) {
    return {
      status: 1,
      message: "Chưa chọn chức vụ!",
      data: null,
    };
  }
  let listIdPermission = [];
  const result = await RolePermission.findAll({
    where: {
      roleId: data.id,
    },
    attributes: ["permissionId"],
  });

  if (result) {
    listIdPermission.push(...result.map((obj) => obj.permissionId));
    if (listIdPermission.length > 0) {
      return {
        status: 0,
        message: "Lấy danh sách quyền hạn thành công!",
        data: listIdPermission,
      };
    } else {
      return {
        status: 0,
        message: "Vai trò chưa được gán quyền hạn nào!",
        data: listIdPermission,
      };
    }
  } else {
    return {
      status: 1,
      message: "Không tìm thấy quyền hạn nào!",
      data: [],
    };
  }
};
const assignPermissionsToRole = async (data) => {
  await RolePermission.destroy({
    where: {
      roleId: data.roleId,
    },
  });
  const res = await RolePermission.bulkCreate(data.permissions);
  if (res) {
    return {
      status: 0,
      message: "Gán quyền thành công!",
      // data: listIdPermission,
    };
  } else {
    return {
      status: -1,
      message: "Gán quyền thất bại!",
      //  data: listIdPermission,
    };
  }
};
const createGroupsStudent = async (data) => {
  if (!data) {
    return {
      status: -1,
      message: "Không có dữ liệu tạo nhóm!",
    };
  }
  const _data = [];
  for (let i = 1; i <= data.totalGroup; i++) {
    const groupName = i < 10 ? `00${i}` : 10 <= i < 99 ? `0${i}` : `${i}`;
    const numOfMembers = data.numOfMembers;
    const status = "NOT_FULL";
    _data.push({ groupName, numOfMembers, status });
  }
  const res = await Group.bulkCreate(_data);
  // const _data = res.map((item) => _.pick(item, ["groupName"]));
  if (res) {
    return {
      status: 0,
      message: "Tạo danh sách nhóm thành công!",
      // data: _data,
    };
  } else {
    return {
      status: 0,
      message: "Tạo danh sách nhóm thất bại!",
      // data: null,
    };
  }
};
const paginationGroupsStudent = async (page, limit) => {
  try {
    if (!page) {
      return {
        status: 1,
        message: "Số trang không hợp lệ!",
      };
    }
    if (!limit) {
      return {
        status: 1,
        message: "Số phần tử của trang không hợp lệ!",
      };
    }
    const offset = (page - 1) * limit;
    const { count, rows } = await Group.findAndCountAll({
      attributes: ["id", "groupName", "topicId", "createdAt"],
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
        groupStudent: rows,
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
//Lấy số lượng tổng sinh viên có trong database
const countStudent = async () => {
  try {
    const count = await Student.count();
    return {
      status: 0,
      message: "Lấy tổng số lượng sinh viên thành công!",
      data: {
        total: count,
      },
    };
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    return {
      status: 1,
      message: "Lấy tổng số lượng sinh viên thất bại!",
      data: null,
    };
  }
};
const deleteGroupStudent = async (data) => {
  if (!data && !data.id) {
    return {
      status: 1,
      message: "Dữ liệu không hợp lệ!",
    };
  }
  const res = await Group.destroy({
    where: {
      id: data.id,
    },
  });
  if (res) {
    return {
      status: 0,
      message: "Xoá nhóm thành công!",
    };
  } else {
    return {
      status: 0,
      message: "Xoá nhóm thất bại!",
    };
  }
};
module.exports = {
  paginationPermission,
  getAllPermission,
  createPermission,
  updatePermission,
  deletePermission,
  findByDescription,
  getRolePermissions,
  assignPermissionsToRole,
  createGroupsStudent,
  paginationGroupsStudent,
  countStudent,
  deleteGroupStudent,
};
