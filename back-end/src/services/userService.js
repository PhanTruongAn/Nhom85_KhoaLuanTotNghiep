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

module.exports = {
  login,
  hashPassword,
};
