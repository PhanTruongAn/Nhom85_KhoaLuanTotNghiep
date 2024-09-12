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

// Hash Password
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

// Find account by username
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

//Login
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

// Create account student
const createStudentAccount = async (data) => {
  const hashPass = hashPassword(data.password);
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
};
const createLecturerAccount = async (data) => {
  const hashPass = hashPassword(data.password);
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
};
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
module.exports = {
  login,
  createStudentAccount,
  createLecturerAccount,
  createBulkAccount,
};
