import db from "../models/index";
import { hashPassword } from "../services/userService";
import _, { isEmpty } from "lodash";
const { Op } = require("sequelize");
//Models Database
const { Lecturer, Role, Topic, TermLecturer, Term } = require("../models");

//Tạo tài khoản giảng viên
const createLecturerAccount = async (data) => {
  try {
    if (!data.fullName) {
      return {
        status: 1,
        message: "Tên đầy đủ không hợp lệ!",
      };
    }
    if (!data.username) {
      return {
        status: 1,
        message: "Mã giảng viên không hợp lệ!",
      };
    }
    if (!data.termId) {
      return {
        status: 1,
        message: "Mã học kì không hợp lệ!",
      };
    }
    const existLecturer = await Lecturer.findOne({
      where: {
        username: data.username,
      },
    });

    let lecturer;

    if (existLecturer) {
      lecturer = existLecturer;
    } else {
      const defaultPassword = "123";
      const hashPass = hashPassword(defaultPassword);
      lecturer = await Lecturer.create({
        ...data,
        password: hashPass,
        roleId: data?.roleId || 2,
      });
    }

    const existTermLecturer = await TermLecturer.findOne({
      where: {
        lecturerId: lecturer.id,
        termId: data.termId,
      },
    });

    if (existTermLecturer) {
      return {
        status: -1,
        message: "Giảng viên đã có trong học kì này!",
      };
    } else {
      await TermLecturer.create({
        lecturerId: lecturer.id,
        termId: data.termId,
      });
      return {
        status: 0,
        message: "Thêm tài khoản giảng viên thành công",
      };
    }
  } catch (error) {
    console.log("Lỗi: ", error.message);
    return {
      status: -1,
      message: `${error.message}!`,
    };
  }
};
// Tạo nhiều tài khoản giảng viên
const createBulkAccountLecturer = async (data) => {
  if (!data || isEmpty(data)) {
    return {
      status: 1,
      message: "Dữ liệu trống!",
      data: null,
    };
  }
  try {
    const testArr = data;
    const currentAccount = await Lecturer.findAll({
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
    const termId = _data[0]?.termId;

    if (!termId) {
      return {
        status: 1,
        message: "Không tìm thấy thông tin học kì!",
        data: null,
      };
    }
    const dataPersist = [];

    Object.entries(_data).map(([key, value], index) => {
      dataPersist.push({
        fullName: value.fullName,
        username: value.username,
        password: hashPassword(value.password),
        roleId: 2,
      });
    });

    const results = await Lecturer.bulkCreate(dataPersist);
    if (results && results.length === dataPersist.length) {
      const termLecturer = results.map((lecturer) => ({
        termId: termId,
        lecturerId: lecturer.id,
      }));

      const termLecturers = await TermLecturer.bulkCreate(termLecturer);

      // Kiểm tra kết quả TermStudent
      if (termLecturers && termLecturers.length === termLecturer.length) {
        return {
          status: 0,
          message: `Tạo mới thành công ${persists.length} tài khoản giảng viên!`,
        };
      } else {
        return {
          status: -1,
          message: `Tạo mới tài khoản giảng viên thất bại!`,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: `Lỗi: ${error.message}!`,
      data: null,
    };
  }
};
// Lấy danh sách giảng viên
const getLecturerList = async (term) => {
  const list = await Lecturer.findAll({
    attributes: ["id", "username", "fullName", "gender", "email", "phone"],
    include: [
      {
        model: Role,
        attributes: ["id", "name", "description"],
      },
      {
        model: Term,
        as: "terms",
        through: {
          attributes: [],
        },
        where: {
          id: term,
        },
      },
    ],
  });
  if (list && list.length > 0) {
    return {
      status: 0,
      message: "Lấy danh sách thành công!",
      data: list,
    };
  }
  return {
    status: -1,
    message: "Lấy danh sách thất bại!",
    data: list,
  };
};
// Lấy danh sách phân trang của giảng viên
const getPaginationLecturer = async (page, limit, term) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Lecturer.findAndCountAll({
      attributes: ["id", "username", "fullName", "gender", "email", "phone"],
      include: [
        {
          model: Role,
          attributes: ["id", "name", "description"],
        },
        {
          model: Term,
          as: "terms",
          through: {
            attributes: [],
          },
          where: {
            id: term,
          },
        },
      ],
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: 0,
      message: "Lấy danh sách thành công!",
      data: {
        totalRows: count,
        totalPages: totalPages,
        lecturers: rows,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: "Lấy danh sách thất bại!",
      data: null,
    };
  }
};
const deleteLecturer = async (data) => {
  if (!data && !data.id && !data.termId) {
    return {
      status: -1,
      message: "Id giảng viên hoặc Id học kì không hợp lệ!",
    };
  }
  const res = await Lecturer.destroy({
    where: { id: data.id },
  });
  const res2 = await TermLecturer.destroy({
    where: { lecturerId: data.id, termId: data.termId },
  });
  if (res && res2) {
    return {
      status: 0,
      message: "Xóa thành công!",
    };
  } else {
    return {
      status: 0,
      message: "Xóa thất bại!",
    };
  }
};

const updateLecturer = async (data) => {
  const updateData = {
    username: data.username,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    gender: data.gender,
  };

  if (data.degree) {
    updateData.degree = data.degree;
  }

  const res = await Lecturer.update(updateData, {
    where: { id: data.id },
  });
  if (res[0] > 0) {
    const updatedLecturer = await Lecturer.findOne({
      where: { id: data.id },
      attributes: { exclude: ["password", "createdAt", "updatedAt", "RoleId"] },
    });
    return {
      status: 0,
      message: "Cập nhật thành công!",
      data: updatedLecturer,
    };
  } else {
    return {
      status: -1,
      message: "Cập nhật thất bại!",
      data: null,
    };
  }
};
const deleteManyLecturer = async (data) => {
  try {
    if (!data && !data.lecturerId && !data.termId) {
      return {
        status: -1,
        message: "Id giảng viên hoặc Id học kì không hợp lệ!",
      };
    }
    const result = Lecturer.destroy({
      where: {
        id: data.lecturerId,
      },
    });
    const result2 = await TermLecturer.destroy({
      where: { lecturerId: data.lecturerId, termId: data.termId },
    });
    if (result && result2) {
      return {
        status: 0,
        message: "Xóa thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Xóa thật bại!",
      };
    }
  } catch (error) {
    return {
      status: -1,
      message: "Lỗi chức năng!",
      data: {
        error,
      },
    };
  }
};
const findLecturersByUserNameOrFullName = async (search) => {
  const results = await Lecturer.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        { fullName: { [Op.like]: `%${search}%` } },
      ],
    },
    attributes: ["id", "username", "fullName", "gender", "email", "phone"],
  });
  if (!isEmpty(results)) {
    return {
      status: 0,
      message: "Tìm kiếm thành công!",
      data: {
        lecturers: results,
      },
    };
  } else {
    return {
      status: -1,
      message: "Không tìm thấy dữ liệu!",
      data: {
        lecturers: null,
      },
    };
  }
};

const findLecturersByName = async (page, limit, input) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Lecturer.findAndCountAll({
      where: {
        fullName: {
          [Op.like]: `${input}%`,
        },
      },
      attributes: ["id", "username", "fullName", "gender", "email", "phone"],
      include: {
        model: Role,
        attributes: ["id", "name", "description"],
      },
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    if (rows.length > 0) {
      return {
        status: 0,
        message: "Tìm kiếm thành công!",
        data: {
          totalRows: count,
          totalPages: totalPages,
          lecturers: rows,
        },
      };
    } else {
      return {
        status: 0,
        message: "Không tìm thấy thông tin khớp dữ liệu nhập vào!",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: "Tìm kiếm thất bại!",
      data: null,
    };
  }
};

// Thêm danh sách đề tài
const createTopics = async (data) => {
  try {
    if (data && !Array.isArray(data)) {
      return {
        status: 1,
        message: "Danh sách đề tài không hợp lệ!",
        data: null,
      };
    } else {
      const _data = _.cloneDeep(data);
      const dataPersist = [];
      Object.entries(_data).map(([key, value], index) => {
        dataPersist.push({
          termId: value.termId,
          lecturerId: value.lecturerId,
          title: value.title,
          description: value.description,
          goals: value.goals,
          requirement: value.requirement,
          standardOutput: value.standardOutput,
          status: "PENDING",
          quantityGroup: value.quantityGroup,
        });
      });

      // console.log("Check persist: ", dataPersist);
      const results = await Topic.bulkCreate(dataPersist);
      if (results) {
        return {
          status: 0,
          message: `Thêm mới thành công ${dataPersist.length} đề tài!`,
        };
      }
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
// const getMyTopics = async ()=>{

// }

const getTerm = async (lecturerId) => {
  try {
    if (!lecturerId) {
      return {
        status: -1,
        message: "Không tìm thấy id sinh viên",
      };
    }
    let terms = await Term.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Lecturer,
        as: "lecturers",
        attributes: [],
        through: { attributes: [] },
        where: {
          id: lecturerId,
        },
      },
    });

    let currentDate = new Date();
    let currentTerm = terms.find((term) => {
      const startDate = new Date(term.startDate);
      const endDate = new Date(term.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });

    if (currentTerm) {
      return {
        status: 0,
        message: "Lấy thông tin học kì thành công!",
        data: currentTerm,
      };
    } else {
      return {
        status: -1,
        message: "Không tìm thấy thông tin học kì hiện tại!",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: -1,
      message: `Lỗi ${error.message}!`,
    };
  }
};

const getPersonalTopics = async (term, id) => {
  if (!term) {
    return {
      status: -1,
      message: "Không có thông tin của học kì!",
    };
  }
  if (!id) {
    return {
      status: -1,
      message: "Không có thông tin của giảng viên!",
    };
  }

  try {
    let topics = await Topic.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "LecturerId"] },
      where: {
        termId: term,
        lecturerId: id,
      },
    });

    if (topics && topics.length > 0) {
      return {
        status: 0,
        message: "Lấy danh sách đề tài cá nhân thành công!",
        data: topics,
      };
    } else {
      return {
        status: -1,
        message: "Danh sách đề tài cá nhân trống!",
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách topics:", error);
    return {
      status: -1,
      message: "Đã xảy ra lỗi khi lấy thông tin!",
      error: error.message,
    };
  }
};
const deleteTopic = async (data) => {
  if (!data.id) {
    return {
      status: -1,
      message: "Mã đề tài không hợp lệ!",
    };
  }
  try {
    let result = await Topic.destroy({
      where: {
        id: data.id,
      },
    });
    if (result > 0) {
      return {
        status: 0,
        message: "Xóa thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Xóa thất bại do không tìm thấy bản ghi nào!",
      };
    }
  } catch (error) {
    console.log("Lỗi: ", error.message);
    return {
      status: -1,
      message: `Lỗi: ${error.message}`,
    };
  }
};
module.exports = {
  createLecturerAccount,
  createBulkAccountLecturer,
  getLecturerList,
  getPaginationLecturer,
  deleteLecturer,
  updateLecturer,
  deleteManyLecturer,
  findLecturersByUserNameOrFullName,
  findLecturersByName,
  createTopics,
  getPersonalTopics,
  getTerm,
  deleteTopic,
};
