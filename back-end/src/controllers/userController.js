import userService from "../services/userService";
import _ from "lodash";
const handleLogin = async (req, res) => {
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

const handleGetDataFromToken = async (req, res) => {
  if (req.user) {
    const { username, role } = req.user;
    const data = await userService.findAccount(username);
    const { password, RoleId, MajorId, ...rest } = data.toJSON();
    const _user = { ...rest, role };
    return res.status(200).json({
      status: 0,
      message: "Lấy thông tin người dùng thành công!",
      data: {
        user: _user,
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
const handleLogOut = (req, res) => {
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
const handleChangePassword = async (req, res) => {
  try {
    const data = await userService.changePassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(data);
  }
};
const handleFindAccount = async (req, res) => {
  try {
    const data = await userService.getEmailByUserName(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(data);
  }
};
const handleSendEmail = async (req, res) => {
  try {
    const data = await userService.sendEmail(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(data);
  }
};

module.exports = {
  handleLogin,
  handleGetDataFromToken,
  handleLogOut,
  handleChangePassword,
  handleFindAccount,
  handleSendEmail,
};
