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

const handleGetDataFromToken = (req, res) => {
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

module.exports = {
  handleLogin,
  handleGetDataFromToken,
  handleLogOut,
};
