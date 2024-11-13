import db from "../models/index";
import { hashPassword } from "../services/userService";
import _, { isEmpty } from "lodash";
const { Op, literal } = require("sequelize");
//Models Database
const {
  Student,
  Lecturer,
  Role,
  Topic,
  TermLecturer,
  Term,
  Note,
  Evaluation,
  Group,
  GroupLecturer,
} = require("../models");

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
    // Lấy danh sách giảng viên hiện tại trong cơ sở dữ liệu
    const currentAccounts = await Lecturer.findAll({
      attributes: ["id", "fullName", "username"],
      raw: true,
    });

    // Tạo danh sách giảng viên mới và kiểm tra tồn tại
    const usernamesInDb = currentAccounts.map((account) => account.username);
    const newLecturers = data.filter(
      ({ username }) => !usernamesInDb.includes(username)
    );

    // Lấy termId từ phần tử đầu tiên của data
    const termId = data[0]?.termId;

    if (!termId) {
      return {
        status: 1,
        message: "Không tìm thấy thông tin học kỳ!",
        data: null,
      };
    }

    // Tạo danh sách các giảng viên mới
    const dataPersist = newLecturers.map((value) => ({
      fullName: value.fullName,
      username: value.username,
      password: hashPassword(value.password),
      roleId: 2,
    }));

    // Thêm giảng viên mới vào cơ sở dữ liệu
    await Lecturer.bulkCreate(dataPersist);

    const termLecturers = [];

    // Kiểm tra từng giảng viên (bao gồm cả giảng viên đã tồn tại)
    for (const lecturer of currentAccounts) {
      const existTermLecturer = await TermLecturer.findOne({
        where: {
          lecturerId: lecturer.id,
          termId: termId,
        },
      });

      // Nếu giảng viên chưa tồn tại trong TermLecturer, thêm vào danh sách
      if (!existTermLecturer) {
        termLecturers.push({
          lecturerId: lecturer.id,
          termId: termId,
        });
      }
    }

    // Thực hiện bulkCreate cho TermLecturer nếu có giảng viên mới
    if (termLecturers.length > 0) {
      await TermLecturer.bulkCreate(termLecturers);
      return {
        status: 0,
        message: `Thêm tài khoản vào học kỳ ${termId} thành công!`,
      };
    } else {
      return {
        status: 0,
        message: `Không có tài khoản nào mới trong học kỳ ${termId}.`,
      };
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
  if (!term) {
    return {
      status: -1,
      message: "Thiếu dữ liệu học kì!",
    };
  }
  try {
    const list = await Lecturer.findAll({
      attributes: ["id", "username", "fullName", "gender", "email", "phone"],
      include: {
        model: Term,
        as: "terms",
        attributes: [],
        through: {
          attributes: [],
        },
        where: {
          id: term,
        },
      },
      where: {
        groupLecturerId: null,
      },
    });
    if (list && list.length > 0) {
      return {
        status: 0,
        message: "Lấy danh sách thành công!",
        data: list,
      };
    }
    return {
      status: 1,
      message: "Tất cả giảng viên đều có nhóm!",
      data: list,
    };
  } catch (error) {
    console.log("Lỗi: ", error.message);
    return {
      status: -1,
      message: "Lỗi chức năng",
      data: null,
    };
  }
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
          attributes: ["id", "name"],
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
const findLecturersByUserNameOrFullName = async (term, search) => {
  const results = await Lecturer.findAll({
    include: {
      model: Term,
      through: {
        attributes: [],
      },
      as: "terms",
      where: {
        id: term,
      },
    },
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
      attributes: {
        exclude: ["createdAt", "updatedAt", "LecturerId"],
        include: [
          [
            literal(
              `(SELECT COUNT(*) FROM Groups WHERE Groups.topicId = Topic.id)`
            ),
            "groupCount",
          ],
        ],
      },

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
    let isTopicAssign = await Group.findOne({
      where: {
        topicId: data.id,
      },
      raw: true,
    });

    if (isTopicAssign) {
      return {
        status: -1,
        message: "Đề tài này đã có nhóm đăng ký!",
      };
    }
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
const updateTopic = async (data) => {
  if (!data) {
    return {
      status: -1,
      message: "Không tìm thấy thông tin cập nhật!",
    };
  }
  try {
    let update = await Topic.update(data, {
      where: {
        id: data.id,
      },
    });
    if (update[0] > 0) {
      return {
        status: 0,
        message: "Cập nhật đề tài thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Cập nhật đề tài thất bại!",
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
const getNotes = async (termId, roleId) => {
  // Kiểm tra dữ liệu đầu vào
  if (!termId || !roleId) {
    return {
      status: -1,
      message: "Thiếu dữ liệu học kỳ hoặc vai trò!",
    };
  }

  try {
    const notes = await Note.findAll({
      where: {
        termId: termId,
      },
      include: {
        attributes: [],
        model: Role,
        as: "roles",
        through: {
          attributes: [],
        },
        where: {
          id: roleId,
        },
      },
    });

    if (notes && notes.length > 0) {
      return {
        status: 0,
        message: "Lấy danh sách thông báo thành công!",
        data: notes,
      };
    } else {
      return {
        status: 1,
        message: "Không tìm thấy thông báo nào!",
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thông báo:", error);
    return {
      status: -1,
      message: "Lỗi hệ thống!",
      data: {
        error: error.message,
      },
    };
  }
};

const pointGroup = async (data) => {
  const {
    discussionPoint,
    progressPoint,
    reportingPoint,
    comment,
    averagePoint,
    groupId,
    termId,
  } = data;
  if (!discussionPoint) {
    return {
      status: -1,
      message: "Điểm thảo luận trống hoặc không hợp lệ!",
    };
  }

  if (!progressPoint) {
    return {
      status: -1,
      message: "Điểm tiến độ trống hoặc không hợp lệ!",
    };
  }

  if (!reportingPoint) {
    return {
      status: -1,
      message: "Điểm báo cáo trống hoặc không hợp lệ!",
    };
  }
  if (!averagePoint) {
    return {
      status: -1,
      message: "Điểm trung bình trống hoặc không hợp lệ!",
    };
  }

  if (!groupId) {
    return {
      status: -1,
      message: "Mã nhóm trống hoặc không hợp lệ!",
    };
  }
  if (!termId) {
    return {
      status: -1,
      message: "Mã học kì trống hoặc không hợp lệ!",
    };
  }
  try {
    const evaluationData = {
      discussionPoint,
      progressPoint,
      reportingPoint,
      averagePoint,
      groupId,
      termId,
      // Chỉ thêm comment nếu nó tồn tại
      ...(comment && { comment }),
    };
    const result = await Evaluation.create(evaluationData);

    if (result) {
      return {
        status: 0,
        message: "Chấm điểm thành công.",
        data: result,
      };
    }
  } catch (error) {
    console.log("Lỗi: ", error.message);
    return {
      status: -1,
      message: `Lỗi chức năng!`,
    };
  }
};

const getGroupTopic = async (lecturerId, termId) => {
  if (!lecturerId) {
    return {
      status: -1,
      message: "Không tìm thấy thông tin giảng viên!",
    };
  }
  if (!termId) {
    return {
      status: -1,
      message: "Không tìm thấy thông tin học kì!",
    };
  }
  try {
    const groups = await Group.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "TopicId", "topicId"] },
      include: [
        {
          model: Topic,
          as: "topic",
          where: {
            lecturerId: lecturerId,
            termId: termId,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "LecturerId"],
          },
        },
        {
          model: Student,
          as: "students",
          attributes: [
            "id",
            "username",
            "fullName",
            "gender",
            "email",
            "phone",
          ],
        },
      ],
    });

    if (groups.length === 0) {
      return {
        status: -1,
        message: "Không tìm thấy nhóm nào cho giảng viên và học kỳ này!",
        data: [],
      };
    }
    return {
      status: 0,
      message: "Lấy danh sách nhóm thành công!",
      data: groups,
    };
  } catch (error) {
    console.log("Lỗi:", error.message);
    return {
      status: -1,
      message: "Lỗi chức năng!",
    };
  }
};

const getLecturerGroup = async (lecturerId) => {
  if (!lecturerId) {
    return {
      status: -1,
      message: "ID giảng viên không hợp lệ!",
    };
  }
  try {
    let lecturer = await Lecturer.findOne({
      attributes: ["id", "username", "groupLecturerId"],
      where: {
        id: lecturerId,
      },
    });
    if (!lecturer) {
      return {
        status: -1,
        message: "Giảng viên không tồn tại!",
      };
    } else {
      let { groupLecturerId } = lecturer;
      let group = await GroupLecturer.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
          id: groupLecturerId,
        },
        include: {
          model: Lecturer,
          as: "lecturers",
          attributes: [
            "id",
            "fullName",
            "username",
            "gender",
            "phone",
            "email",
          ],
        },
      });
      if (!group) {
        return {
          status: -1,
          message: "Không tìm thấy nhóm giảng viên!",
          data: null,
        };
      }
      return {
        status: 0,
        message: "Lấy thông tin nhóm giảng viên thành công!",
        group,
      };
    }
  } catch (error) {
    console.log("Lỗi: ", error.message);
    return {
      status: -1,
      message: "Lỗi chức năng!",
    };
  }
};
const getReviewStudentGroups = async (groupLecturerId, termId) => {
  if (!groupLecturerId && !termId) {
    return {
      status: -1,
      message: "Nhóm giảng viên hoặc học kì không hợp lệ!",
    };
  }
  try {
    let groups = await Group.findAll({
      where: {
        groupLecturerId: groupLecturerId,
        termId: termId,
      },
      attributes: ["id", "groupName"],
      include: [
        {
          model: Topic,
          as: "topic",
          attributes: {
            exclude: ["createdAt", "updatedAt", "LecturerId"],
          },
        },
        {
          model: Student,
          as: "students",
          attributes: [
            "id",
            "username",
            "fullName",
            "gender",
            "email",
            "phone",
          ],
        },
      ],
    });
    if (groups && groups.length > 0) {
      return {
        status: 0,
        message: "Lấy danh sách nhóm sinh viên thành công!",
        groups,
      };
    } else {
      return {
        status: -1,
        message: "Không tìm thấy nhóm sinh viên nào được phân công!",
        groups: [],
      };
    }
  } catch (error) {
    console.log("Lỗi: ", error.message);
    return {
      status: -1,
      message: "Lỗi chức năng!",
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
  updateTopic,
  getNotes,
  pointGroup,
  getGroupTopic,
  getLecturerGroup,
  getReviewStudentGroups,
};
