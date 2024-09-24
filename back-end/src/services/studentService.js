import db from "../models/index";
import { hashPassword } from "../services/userService";
import _ from "lodash";
const { Op } = require("sequelize");
//Models Database
const Student = db.Student;
const Role = db.Role;
// Tạo tài khoản sinh viên
const createStudentAccount = async (data) => {
  if (!data.fullName) {
    return {
      status: 1,
      message: "Tên đầy đủ không được trống!",
    };
  }
  if (!data.username) {
    return {
      status: 1,
      message: "Mã sinh viên không được trống!",
    };
  }
  const existStudent = await Student.findOne({
    where: {
      username: data.username,
    },
  });
  if (existStudent) {
    return {
      status: -1,
      message: "Sinh viên này đã tồn tại trong hệ thống!",
    };
  } else {
    const defaultPassword = "123";
    const hashPass = hashPassword(defaultPassword);
    const student = await Student.create({
      ...data,
      password: hashPass,
      roleId: 1,
    });
    if (student) {
      return {
        status: 0,
        message: "Tạo tài khoản sinh viên thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Tạo tài khoản sinh viên thất bại!",
        data,
      };
    }
  }
};
// Tạo nhiều tài khoản sinh viên
const createBulkAccount = async (data) => {
  console.log(data);
  try {
    const testArr = data;
    const currentAccount = await Student.findAll({
      attributes: ["fullName", "username"],
      raw: true,
    });

    const persists = data.filter(
      ({ username: username1 }) =>
        !currentAccount.some(
          ({ username: username2 }) => username1 === username2
        )
    );
    if (persists.length === 0) {
      return {
        status: 0,
        message: "Không có dữ liệu được tạo mới...",
      };
    }
    const _data = _.cloneDeep(persists);
    const dataPersist = [];
    Object.entries(_data).map(([key, value], index) => {
      dataPersist.push({
        fullName: value.fullName,
        username: value.username,
        password: hashPassword(value.password),
        roleId: 1,
      });
    });

    // console.log("Check persist: ", dataPersist);
    const results = await Student.bulkCreate(dataPersist);
    if (persists) {
      return {
        status: 0,
        message: `Tạo mới thành công ${persists.length} tài khoản sinh viên!`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 1,
      message: "Lỗi chức năng!",
      data: null,
    };
  }
};
// Lấy danh sách sinh viên
const getStudentList = async () => {
  const list = await Student.findAll({
    attributes: ["id", "username", "fullName", "gender", "email", "phone"],
    include: {
      model: Role,
    },
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
// Lấy danh sách phân trang của sinh viên
const getPaginationStudent = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Student.findAndCountAll({
      attributes: ["id", "username", "fullName", "gender", "email", "phone"],
      include: {
        model: Role,
        attributes: ["id", "name", "description"],
      },
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
        students: rows,
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
const deleteStudent = async (data) => {
  const res = await Student.destroy({
    where: { id: data.id },
  });
  if (res) {
    return {
      status: 0,
      message: "Xóa thành công!",
    };
  } else {
    return {
      status: 0,
      message: "Xóa thất bại!",
    };
  }
};

const updateStudent = async (data) => {
  const res = await Student.update(
    {
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
    },
    { where: { id: data.id } }
  );
  if (res) {
    return {
      status: 0,
      message: "Cập nhật thành công!",
      data: res,
    };
  } else {
    return {
      status: -1,
      message: "Cập nhật thất bại!",
      data: null,
    };
  }
};
const deleteManyStudent = async (data) => {
  try {
    const result = Student.destroy({
      where: {
        id: data,
      },
    });
    if (result) {
      return {
        status: 0,
        message: "Xóa thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Xóa thật bại!",
      };
    }
  } catch (error) {
    return {
      status: -1,
      message: "Lỗi chức năng!",
      data: {
        error,
      },
    };
  }
};

const findStudentsByUserName = async (page, limit, input) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Student.findAndCountAll({
      where: {
        username: {
          [Op.like]: `${input}%`,
        },
      },
      attributes: ["id", "username", "fullName", "gender", "email", "phone"],
      include: {
        model: Role,
        attributes: ["id", "name", "description"],
      },
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    if (rows.length > 0) {
      return {
        status: 0,
        message: "Tìm kiếm thành công!",
        data: {
          totalRows: count,
          totalPages: totalPages,
          students: rows,
        },
      };
    } else {
      return {
        status: 0,
        message: "Không tìm thấy thông tin khớp dữ liệu nhập vào!",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: "Tìm kiếm thất bại!",
      data: null,
    };
  }
};

const findStudentsByName = async (page, limit, input) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Student.findAndCountAll({
      where: {
        fullName: {
          [Op.like]: `${input}%`,
        },
      },
      attributes: ["id", "username", "fullName", "gender", "email", "phone"],
      include: {
        model: Role,
        attributes: ["id", "name", "description"],
      },
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    if (rows.length > 0) {
      return {
        status: 0,
        message: "Tìm kiếm thành công!",
        data: {
          totalRows: count,
          totalPages: totalPages,
          students: rows,
        },
      };
    } else {
      return {
        status: 0,
        message: "Không tìm thấy thông tin khớp dữ liệu nhập vào!",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: "Tìm kiếm thất bại!",
      data: null,
    };
  }
};
module.exports = {
  createStudentAccount,
  createBulkAccount,
  getPaginationStudent,
  getStudentList,
  deleteStudent,
  updateStudent,
  deleteManyStudent,
  findStudentsByName,
  findStudentsByUserName,
};
