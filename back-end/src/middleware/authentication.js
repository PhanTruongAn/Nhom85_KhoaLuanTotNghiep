require("dotenv").config();
import jwtAction from "./jwtAction";
//Non-secure path
const white_list = [
  "/",
  //   "/createStudent",
  //   "/createLecturer",
  "/login",
  "/log-out",
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
      if (!cookie.accessToken || !tokenFromHeader) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized!",
        });
      } else {
        const token = cookie.accessToken ? cookie.accessToken : tokenFromHeader;
        const isVerify = jwtAction.verifyToken(token);
        if (isVerify) {
          req.user = isVerify;
          req.token = token;
          next();
        } else {
          return res.status(401).json({
            status: 401,
            message: "Phiên đăng nhập đã hết hạn!",
          });
        }
      }
    }, 2000);
  }
};

const checkUserPermission = (req, res, next) => {
  if (white_list.includes(req.path) || req.path === "/fetch-token")
    return next();
  if (req.user) {
    const permissions = req.user.role.Permissions;
    const currentUrl = req.path;
    const userAdmin = req.user.role.name;
    const canAccess = permissions.some(
      (item) => item.apiPath === currentUrl || currentUrl.includes(item.apiPath)
    );
    if (canAccess === true || userAdmin === "Admin") {
      next();
    } else {
      return res.status(403).json({
        status: 403,
        data: null,
        message: "Bạn không có quyền truy cập nguồn tài nguyên này!",
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
