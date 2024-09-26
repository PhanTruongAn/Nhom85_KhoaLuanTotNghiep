import bcrypt from "bcryptjs";
import db from "../models/index";
import _ from "lodash";
import jwtAction from "../middleware/jwtAction";
import roleService from "./roleService";
import { where } from "sequelize";
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
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (student) {
    return student;
  }
  const lecturer = await Lecturer.findOne({
    where: {
      username: username,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
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
const changePassword = async (data) => {
  try {
    const { username, currentPassword, newPassword, roleName } = data;
    console.log(username, currentPassword, newPassword, roleName);
    switch (roleName) {
      case "STUDENT":
        const student = await Student.findOne({
          where: {
            username: username,
          },
        });
        const comparePassword = bcrypt.compareSync(
          currentPassword,
          student.password
        );
        if (!comparePassword) {
          return {
            status: 1,
            message: "Mật khẩu cũ không đúng!",
          };
        } else {
          const hashPass = hashPassword(newPassword);
          const res = await Student.update(
            {
              password: hashPass,
            },
            { where: { username: username } }
          );
          if (res) {
            return {
              status: 0,
              message: "Cập nhật mật khẩu thành công!",
            };
          } else {
            return {
              status: -1,
              message: "Cập nhật mật khẩu thất bại!",
            };
          }
        }

      default:
        const lecturer = await Lecturer.findOne({
          where: {
            username: username,
          },
        });
        const comparePassword2 = bcrypt.compareSync(
          currentPassword,
          lecturer.password
        );
        if (!comparePassword2) {
          return {
            status: 1,
            message: "Mật khẩu cũ không đúng!",
          };
        } else {
          const hashPass = hashPassword(newPassword);
          const res = await Lecturer.update(
            {
              password: hashPass,
            },
            { where: { username: username } }
          );
          if (res) {
            return {
              status: 0,
              message: "Cập nhật mật khẩu thành công!",
            };
          } else {
            return {
              status: -1,
              message: "Cập nhật mật khẩu thất bại!",
            };
          }
        }
    }
  } catch (error) {
    return { status: -1, message: error };
  }
};
module.exports = {
  login,
  hashPassword,
  changePassword,
  findAccount,
};
