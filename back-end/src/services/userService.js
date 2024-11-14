import bcrypt from "bcryptjs";
import db from "../models/index";
import _ from "lodash";
import jwtAction from "../middleware/jwtAction";
import roleService from "./roleService";
import { where } from "sequelize";
import { mailer } from "../utils/mailer";
import commonUtils from "../utils/commonUtils";
import templateHtml from "../utils/templateHtml";
// Salt Bcrypt
let salt = bcrypt.genSaltSync(10);

//Models Database
const { Student, Lecturer, Role } = require("../models");
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
    // include: {
    //   model: Major,
    //   as: "major",
    //   attributes: { exclude: ["createdAt", "updatedAt"] },
    // },
    attributes: {
      exclude: ["createdAt", "updatedAt", "MajorId", "RoleId"],
    },
  });
  if (student) {
    return student;
  }
  const lecturer = await Lecturer.findOne({
    where: {
      username: username,
    },
    attributes: { exclude: ["createdAt", "updatedAt", "RoleId"] },
  });
  if (lecturer) {
    return lecturer;
  }
  return null;
};
const getEmailByUserName = async (data) => {
  if (!data && !data.username) {
    return {
      status: 1,
      message: "Hãy nhập username!",
    };
  }
  const res = await findAccount(data.username);
  if (res) {
    const data = _.pick(res, ["email"]);
    return {
      status: 0,
      message: "Tìm tài khoản thành công!",
      data: data,
    };
  } else {
    return {
      status: -1,
      message: "Tài khoản không tồn tại!",
      data: null,
    };
  }
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
  const role = await Role.findOne({
    where: { id: user.roleId },
    attributes: ["id", "name", "description"],
  });
  if (user) {
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (comparePassword) {
      // const role = await roleService.getRoleWithId(user);
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

const sendEmail = async (data) => {
  const { email, username } = data;

  if (!data && !email) {
    return {
      status: 1,
      message: "Hãy nhập email!",
    };
  }

  const password = commonUtils.getRandomPassword();
  const newPassword = password.toString();
  mailer.sendMail(
    email,
    "IUH - Cấp lại mật khẩu mới",
    templateHtml.getPassHtml(password)
  );
  const hashPass = hashPassword(newPassword);
  const payload = {
    username: username,
    password: hashPass,
  };
  const result = await updateForgotPassword(payload);
  if (result && result.status === 0) {
    return result;
  } else {
    return {
      status: -1,
      message: "Cấp mật khẩu mới thất bại!",
    };
  }
};
// Forgot Password
const updateForgotPassword = async (data) => {
  const { username, password } = data;

  const student = await Student.findOne({ where: { username: username } });

  if (student) {
    student.password = password;
    await student.save();

    return {
      status: 0,
      message: "Cấp mật khẩu mới thành công cho sinh viên!",
    };
  }

  const lecturer = await Lecturer.findOne({ where: { username: username } });

  if (lecturer) {
    lecturer.password = password;
    await lecturer.save();

    return {
      status: 0,
      message: "Cấp mật khẩu mới thành công cho giảng viên!",
    };
  }

  return {
    status: 1,
    message: "Không tìm thấy người dùng với tên đăng nhập này!",
  };
};

module.exports = {
  login,
  hashPassword,
  changePassword,
  findAccount,
  getEmailByUserName,
  sendEmail,
  updateForgotPassword,
};
