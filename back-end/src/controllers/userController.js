import userService from "../services/userService";
import _ from "lodash";
const handlerLogin = async (req, res) => {
  try {
    const data = await userService.login(req.body);
    if (data && data.data) {
      res.cookie("accessToken", data.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerCreateStudentAccount = async (req, res) => {
  try {
    const data = await userService.createStudentAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerCreateLecturerAccount = async (req, res) => {
  try {
    let data = await userService.createLecturerAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerGetDataFromToken = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      status: 0,
      message: "Lấy thông tin người dùng thành công!",
      data: {
        user: _.pick(req.user, ["fullName", "username", "role"]),
        accessToken: req.token,
      },
    });
  } else {
    return res.status(500).json({
      status: -1,
      message: "Lấy thông tin người dùng thất bại!",
      data: null,
    });
  }
};
const handlerLogOut = (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({
      status: 0,
      message: "Đăng xuất thành công!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handlerBulkCreate = async (req, res) => {
  try {
    let data = await userService.createBulkAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerBulkCreateLecturer = async (req, res) => {
  try {
    let data = await userService.createBulkAccountLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handlerStudentGetAll = async (req, res) => {
  if (req.query.page && req.query.limit) {
    let limit = req.query.limit;
    let page = req.query.page;
    const data = await userService.getPaginationStudent(+page, +limit);
    return res.status(200).json(data);
  } else {
    let data = await userService.getStudentList();
    return res.status(200).json(data);
  }
};

const handlerLecturerGetAll = async (req, res) => {
  if (req.query.page && req.query.limit) {
    let limit = req.query.limit;
    let page = req.query.page;
    const data = await userService.getPaginationLecturer(+page, +limit);
    return res.status(200).json(data);
  } else {
    let data = await userService.getLecturerList();
    return res.status(200).json(data);
  }
};

const handlerDeleteStudent = async (req, res) => {
  try {
    let data = await userService.deleteStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerUpdateStudent = async (req, res) => {
  try {
    let data = await userService.updateStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handlerLogin,
  handlerCreateStudentAccount,
  handlerCreateLecturerAccount,
  handlerGetDataFromToken,
  handlerLogOut,
  handlerBulkCreate,
  handlerBulkCreateLecturer,
  handlerStudentGetAll,
  handlerLecturerGetAll,
  handlerDeleteStudent,
  handlerUpdateStudent,
};
