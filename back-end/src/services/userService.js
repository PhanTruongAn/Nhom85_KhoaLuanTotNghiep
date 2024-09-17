import bcrypt from "bcryptjs";
import db from "../models/index";
import _ from "lodash";
import jwtAction from "../middleware/jwtAction";
import roleService from "./roleService";
// Salt Bcrypt
let salt = bcrypt.genSaltSync(10);

//Models Database
const Student = db.Student;
const Lecturer = db.Lecturer;
const Role = db.Role;
// Hash Password
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// Tìm tài khoản dựa vào username
const findAccount = async (username) => {
  const student = await Student.findOne({
    where: {
      username: username,
    },
  });
  if (student) {
    return student;
  }
  const lecturer = await Lecturer.findOne({
    where: {
      username: username,
    },
  });
  if (lecturer) {
    return lecturer;
  }
  return null;
};

//Chức năng đăng nhập
const login = async (data) => {
  const username = data.username;
  const password = data.password;
  if (!username || !password) {
    return {
      status: -1,
      message: "Hãy điền đầy đủ thông tin!",
      data: null,
    };
  }
  const user = await findAccount(username);
  if (user) {
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (comparePassword) {
      const role = await roleService.getRoleWithId(user);
      const payload = {
        fullName: user.fullName,
        username: user.username,
        role,
      };
      const accessToken = jwtAction.createToken(payload);

      return {
        status: 0,
        message: "Đăng nhập thành công!",
        data: {
          accessToken,
        },
      };
    } else {
      return {
        status: -1,
        message: "Sai mật khẩu",
        data: null,
      };
    }
  }
  return {
    status: -1,
    message: "Tài khoản không tồn tài!",
    data: null,
  };
};

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
      groupId: data.role,
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
      groupId: data.role,
      roleId: 2,
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

// Tạo nhiều tài khoản sinh viên
const createBulkAccount = async (data) => {
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
// Lấy danh sách giảng viên
const getLecturerList = async () => {
  const list = await Lecturer.findAll({
    attributes: ["id", "username", "fullName", "email", "phone"],
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
      attributes: ["id", "username", "fullName", "email", "phone"],
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

module.exports = {
  login,
  createStudentAccount,
  createLecturerAccount,
  createBulkAccount,
  createBulkAccountLecturer,
  getPaginationStudent,
  getStudentList,
  getLecturerList,
  getPaginationLecturer,
  deleteStudent,
  updateStudent,
};
