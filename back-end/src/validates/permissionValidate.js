import db from "../models/index";
const Permission = db.Permission;
const permissionValid = {
  checkInput: async (data) => {
    const isExist = await Permission.findOne({
      where: {
        apiPath: data.apiPath,
      },
    });
    if (isExist) {
      return {
        status: 1,
        message: "Api đã tồn tại trong hệ thống!",
      };
    }
    if (!data.apiPath) {
      return {
        status: 1,
        message: "Api không được rỗng!",
      };
    }
    if (!data.description) {
      return {
        status: 1,
        message: "Mô tả của api không được rỗng!",
      };
    }
    return {
      status: 0,
    };
  },
};
module.exports = permissionValid;
