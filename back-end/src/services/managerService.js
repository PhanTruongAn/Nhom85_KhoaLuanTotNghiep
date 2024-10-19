import db from "../models/index";
import _, { isEmpty } from "lodash";
import permissionValid from "../validates/permissionValidate";
import { isFieldDate, isValidSemester } from "../validates/termValidate";
const { Op } = require("sequelize");
const {
  Student,
  Permission,
  Group,
  RolePermission,
  Topic,
  Term,
} = require("../models");

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
    if (res[0] > 0) {
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
  if (!input) {
    return {
      status: -1,
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
  if (!isEmpty(res)) {
    return {
      status: 0,
      message: "Tìm kiếm thành công!",
      data: res,
    };
  } else {
    return {
      status: -1,
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
  if (!data.estimateGroupStudent || data.estimateGroupStudent <= 0) {
    return {
      status: -1,
      message: "Số lượng nhóm cần tạo không hợp lệ!",
    };
  }

  const _data = [];

  // Tìm nhóm có groupName lớn nhất và đảm bảo rằng groupName là chuỗi số hợp lệ
  const lastGroup = await Group.findOne({
    order: [["groupName", "DESC"]], // Lấy nhóm có groupName lớn nhất
  });

  let countGroup = 0;

  if (lastGroup) {
    const groupNameAsNumber = parseInt(lastGroup.groupName, 10); // Chuyển đổi groupName thành số nguyên
    if (!isNaN(groupNameAsNumber)) {
      countGroup = groupNameAsNumber;
    } else {
      // Nếu không chuyển đổi được thành số, trả về lỗi
      return {
        status: -1,
        message: "Lỗi: groupName không hợp lệ!",
      };
    }
  }
  // Giới hạn số nhóm tạo ra (ví dụ không quá 100 nhóm một lần)
  const maxGroupsToCreate = 100;
  const groupsToCreate = Math.min(data.estimateGroupStudent, maxGroupsToCreate);

  for (let i = countGroup + 1; i <= countGroup + groupsToCreate; i++) {
    const groupName = i < 10 ? `00${i}` : i < 100 ? `0${i}` : `${i}`; // Định dạng tên nhóm
    const numOfMembers = data.numOfMembers;
    const status = "NOT_FULL";
    _data.push({ groupName, numOfMembers, status });
  }

  const res = await Group.bulkCreate(_data);

  if (res) {
    return {
      status: 0,
      message: "Tạo danh sách nhóm thành công!",
      data: _data,
    };
  } else {
    return {
      status: 0,
      message: "Tạo danh sách nhóm thất bại!",
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
      attributes: ["id", "groupName", "numOfMembers"],
      offset: offset,
      limit: limit,
      include: [
        {
          model: Student,
          as: "students",
          attributes: [
            "id",
            "fullName",
            "email",
            "phone",
            "isLeader",
            "gender",
            "username",
          ],
        },
        {
          model: Topic,
          as: "topic",
          attributes: ["id", "title"],
        },
      ],
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
    const countStudent = await Student.count();
    const countGroup = await Group.count();
    return {
      status: 0,
      message: "Lấy tổng số lượng sinh viên và tổng số nhóm thành công!",
      data: {
        totalStudent: countStudent,
        totalGroup: countGroup,
      },
    };
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    return {
      status: 1,
      message: "Lấy tổng số lượng sinh viên và tổng số nhóm thất bại!",
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
const createNewTerm = async (data) => {
  if (!data) {
    return {
      status: -1,
      message: "Dữ liệu học kì mới không có!",
    };
  }
  const {
    name,
    startDate,
    endDate,
    endChooseGroupDate,
    endChooseTopicDate,
    endDiscussionDate,
    endPublicResultDate,
    endPublicTopicDate,
    endReportDate,
    startChooseGroupDate,
    startChooseTopicDate,
    startDiscussionDate,
    startPublicResultDate,
    startPublicTopicDate,
    startReportDate,
  } = data;
  const fieldsToCheck = [
    startDate,
    endDate,
    endChooseGroupDate,
    endChooseTopicDate,
    endDiscussionDate,
    endPublicResultDate,
    endPublicTopicDate,
    endReportDate,
    startChooseGroupDate,
    startChooseTopicDate,
    startDiscussionDate,
    startPublicResultDate,
    startPublicTopicDate,
    startReportDate,
  ];
  const fieldNames = {
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    startChooseGroupDate: "Ngày bắt đầu chọn nhóm",
    endChooseGroupDate: "Ngày kết thúc chọn nhóm",
    startChooseTopicDate: "Ngày bắt đầu chọn đề tài",
    endChooseTopicDate: "Ngày kết thúc chọn đề tài",
    startDiscussionDate: "Ngày bắt đầu thảo luận",
    endDiscussionDate: "Ngày kết thúc thảo luận",
    startReportDate: "Ngày bắt đầu báo cáo",
    endReportDate: "Ngày kết thúc báo cáo",
    startPublicResultDate: "Ngày bắt đầu công bố kết quả",
    endPublicResultDate: "Ngày kết thúc công bố kết quả",
  };
  if (name === "") {
    return {
      status: -1,
      message: "Tên học kì mới không được trống",
    };
  }
  const validName = isValidSemester(name);
  if (validName.status !== 0) {
    return validName;
  }
  let isValid = true;
  let errorMessage = "";
  for (let field of fieldsToCheck) {
    if (field !== undefined && field !== null && !isFieldDate(field)) {
      isValid = false;
      const fieldName = Object.keys(fieldNames).find(
        (key) => fieldNames[key] === field
      );
      errorMessage = `${fieldNames[fieldName]} không phải dạng Date!`;
      break;
    }
  }
  if (!isValid) {
    return {
      status: 1,
      message: errorMessage,
    };
  }

  const isExistTerm = await Term.findOne({
    where: {
      name: name,
    },
    raw: true,
  });
  if (isExistTerm && typeof isExistTerm === "object") {
    return {
      status: -1,
      message: `Học kì ${isExistTerm.name} đã tồn tại trong hệ thống!`,
    };
  }
  const result = await Term.create({
    name,
    startDate,
    endDate,
    endChooseGroupDate,
    endChooseTopicDate,
    endDiscussionDate,
    endPublicResultDate,
    endPublicTopicDate,
    endReportDate,
    startChooseGroupDate,
    startChooseTopicDate,
    startDiscussionDate,
    startPublicResultDate,
    startPublicTopicDate,
    startReportDate,
  });
  if (result && typeof result === "object") {
    const rawData = result.get({ plain: true });
    return {
      status: 0,
      message: "Tạo học kì mới thành công!",
      data: rawData,
    };
  } else {
    return {
      status: 0,
      message: "Tạo học kì mới thất bại!",
      data: null,
    };
  }
};

const getTerms = async () => {
  let terms = await Term.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    raw: true,
  });
  if (terms && terms.length > 0) {
    return {
      status: 0,
      message: "Lấy danh sách học kì thành công!",
      data: terms,
    };
  }
  return {
    status: 1,
    message: "Danh sách học kì trống!",
    data: [],
  };
};

const updateTerm = async (newData) => {
  const { id } = newData;
  if (!id) {
    return {
      status: -1,
      message: "Id không hợp lệ (undefinded hoặc null)!",
    };
  }
  const update = await Term.update(newData, {
    where: {
      id: id,
    },
  });
  if (update[0] > 0) {
    return {
      status: 0,
      message: "Cập nhật học kì thành công!",
    };
  } else {
    return {
      status: -1,
      message: "Cập nhật học kì thất bại!",
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
  createNewTerm,
  getTerms,
  updateTerm,
};
