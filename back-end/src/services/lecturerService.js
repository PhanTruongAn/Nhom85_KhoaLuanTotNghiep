import db from "../models/index";
import { hashPassword } from "../services/userService";
import _ from "lodash";
//Models Database
const Lecturer = db.Lecturer;
const Role = db.Role;
//Tạo tài khoản giảng viên
const createLecturerAccount = async (data) => {
  if (!data.fullName) {
    return {
      status: 1,
      message: "Tên đầy đủ không được trống!",
    };
  }
  if (!data.username) {
    return {
      status: 1,
      message: "Mã giảng viên không được trống!",
    };
  }
  const existLecturer = await Lecturer.findOne({
    where: {
      username: data.username,
    },
  });
  if (existLecturer) {
    return {
      status: -1,
      message: "Tài khoản giảng viên đã tồn tại!",
    };
  } else {
    const defaultPassword = "123";
    const hashPass = hashPassword(defaultPassword);
    const lecturer = await Lecturer.create({
      ...data,
      password: hashPass,
      roleId: data.roleId,
    });
    if (lecturer) {
      return {
        status: 0,
        message: "Tạo tài khoản giảng viên thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Tạo tài khoản giảng viên thất bại!",
        data,
      };
    }
  }
};
// Tạo nhiều tài khoản giảng viên
const createBulkAccountLecturer = async (data) => {
  try {
    const testArr = data;
    const currentAccount = await Lecturer.findAll({
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
        roleId: 2,
      });
    });

    // console.log("Check persist: ", dataPersist);
    const results = await Lecturer.bulkCreate(dataPersist);
    if (persists) {
      return {
        status: 0,
        message: `Tạo mới thành công ${persists.length} tài khoản giảng viên!`,
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
// Lấy danh sách giảng viên
const getLecturerList = async () => {
  const list = await Lecturer.findAll({
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
// Lấy danh sách phân trang của giảng viên
const getPaginationLecturer = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Lecturer.findAndCountAll({
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
        lecturers: rows,
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
const deleteLecturer = async (data) => {
  const res = await Lecturer.destroy({
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

const updateLecturer = async (data) => {
  const res = await Lecturer.update(
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
const deleteManyLecturer = async (data) => {
  try {
    const result = Lecturer.destroy({
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
module.exports = {
  createLecturerAccount,
  createBulkAccountLecturer,
  getLecturerList,
  getPaginationLecturer,
  deleteLecturer,
  updateLecturer,
  deleteManyLecturer,
};
