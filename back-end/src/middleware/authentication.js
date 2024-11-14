require("dotenv").config();
import jwtAction from "./jwtAction";
import roleService from "../services/roleService";
//Non-secure path
const white_list = [
  "/",
  //   "/createStudent",
  //   "/createLecturer",
  "/login",
  "/log-out",
  "/find-account",
  "/send-email",
];

const extractToken = (req) => {
  if (req?.headers?.authorization?.split(" ")?.[1]) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const authentication = (req, res, next) => {
  if (white_list.includes(req.path)) {
    return next();
  } else {
    setTimeout(() => {
      const cookie = req.cookies;
      const tokenFromHeader = extractToken(req);
      const token = tokenFromHeader || cookie.accessToken;
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: "Bạn chưa đăng nhập!",
        });
      } else {
        const token = cookie.accessToken ? cookie.accessToken : tokenFromHeader;
        const isVerify = jwtAction.verifyToken(token);
        if (isVerify) {
          req.user = isVerify;
          next();
        } else {
          return res.status(401).json({
            status: 401,
            message: "Phiên đăng nhập đã hết hạn!",
          });
        }
      }
    }, 1000);
  }
};

const checkUserPermission = async (req, res, next) => {
  if (white_list.includes(req.path) || req.path === "/fetch-token")
    return next();
  if (req.user) {
    const userAccount = await roleService.getRoleWithId(req.user.role.id);
    const { Permissions } = userAccount;
    const currentUrl = req.path;
    const userAdmin = req.user.role.name;
    const canAccess = Permissions.some(
      (item) => item.apiPath === currentUrl || currentUrl.includes(item.apiPath)
    );
    if (
      canAccess === true ||
      userAdmin === "ADMIN" ||
      userAdmin === "MANAGER"
    ) {
      next();
    } else {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Bạn không có quyền hạn này!",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      data: null,
      message: "Chưa xác thực người dùng!",
    });
  }
};
module.exports = { authentication, checkUserPermission };
