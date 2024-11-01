import db from "../models/index";
import { hashPassword } from "../services/userService";
import _, { isEmpty, update } from "lodash";
import { sequelize } from "../models";
import { raw } from "express";
const { Op, literal } = require("sequelize");

const {
  Student,
  Group,
  Role,
  Topic,
  Lecturer,
  TermStudent,
  Term,
  Note,
  Major,
  Evaluation,
} = require("../models");

// Tạo tài khoản sinh viên
const createStudentAccount = async (data) => {
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
        message: "Mã sinh viên không hợp lệ!",
      };
    }

    if (!data.termId) {
      return {
        status: 1,
        message: "Mã học kì không hợp lệ!",
      };
    }
    // Kiểm tra sinh viên đã tồn tại hay chưa
    const existStudent = await Student.findOne({
      where: {
        username: data.username,
      },
    });

    let student;

    // Nếu sinh viên đã tồn tại
    if (existStudent) {
      student = existStudent;
    } else {
      // Nếu sinh viên chưa tồn tại, tạo sinh viên mới
      const defaultPassword = "123";
      const hashPass = hashPassword(defaultPassword);
      student = await Student.create({
        ...data,
        password: hashPass,
        roleId: 1,
      });
    }

    // Kiểm tra xem sinh viên đã tồn tại trong học kỳ này chưa
    const existTermStudent = await TermStudent.findOne({
      where: {
        studentId: student.id,
        termId: data.termId,
      },
    });

    if (existTermStudent) {
      return {
        status: -1,
        message: "Sinh viên này đã tồn tại trong học kỳ này!",
      };
    } else {
      // Nếu sinh viên chưa tồn tại trong học kỳ, thêm vào bảng TermStudent
      await TermStudent.create({
        studentId: student.id,
        termId: data.termId,
      });

      return {
        status: 0,
        message: "Tạo tài khoản sinh viên thành công!",
      };
    }
  } catch (error) {
    return {
      status: -1,
      message: `${error.message}!`,
    };
  }
};

// Tạo nhiều tài khoản sinh viên
const createBulkAccount = async (data) => {
  if (!data || isEmpty(data)) {
    return {
      status: 1,
      message: "Dữ liệu trống!",
      data: null,
    };
  }
  try {
    const testArr = data;
    const currentAccount = await Student.findAll({
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
        roleId: 1,
      });
    });

    // console.log("Check persist: ", dataPersist);
    const results = await Student.bulkCreate(dataPersist);
    if (results && results.length === dataPersist.length) {
      const termStudent = results.map((student) => ({
        termId: termId,
        studentId: student.id,
      }));

      // Kiểm tra xem TermStudent có sẵn không

      const termStudents = await TermStudent.bulkCreate(termStudent);

      // Kiểm tra kết quả TermStudent
      if (termStudents && termStudents.length === termStudent.length) {
        return {
          status: 0,
          message: `Tạo mới thành công ${persists.length} tài khoản sinh viên!`,
        };
      } else {
        return {
          status: -1,
          message: `Tạo mới tài khoản sinh viên thất bại!`,
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
// Lấy danh sách sinh viên
const getStudentList = async (term) => {
  const list = await Student.findAll({
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
// Lấy danh sách phân trang của sinh viên
const getPaginationStudent = async (page, limit, term) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Student.findAndCountAll({
      attributes: [
        "id",
        "username",
        "fullName",
        "gender",
        "email",
        "phone",
        "groupId",
      ],
      include: [
        {
          model: Role,
          attributes: ["id", "name", "description"],
        },
        {
          model: Term,
          through: {
            attributes: [],
          },
          as: "terms",
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
        students: rows,
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
const deleteStudent = async (data) => {
  if (!data && !data.id && !data.termId) {
    return {
      status: -1,
      message: "Id sinh viên hoặc Id học kì không hợp lệ!",
    };
  }
  const res = await Student.destroy({
    where: { id: data.id },
  });
  let res2 = await TermStudent.destroy({
    where: { studentId: data.id, termId: data.termId },
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

const updateStudent = async (data) => {
  const updateData = {
    username: data.username,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    gender: data.gender,
    className: data?.className || null,
    typeTraining: data?.typeTraining || null,
    majorId: data?.majorId || null,
  };

  const res = await Student.update(updateData, {
    where: { id: data.id },
  });
  if (res[0] > 0) {
    return {
      status: 0,
      message: "Cập nhật thành công!",
    };
  } else {
    return {
      status: -1,
      message: "Cập nhật thất bại!",
      data: null,
    };
  }
};
const deleteManyStudent = async (data) => {
  if (!data && !data.studentId && !data.termId) {
    return {
      status: -1,
      message: "Id sinh viên hoặc Id học kì không hợp lệ!",
    };
  }
  try {
    const result = Student.destroy({
      where: {
        id: data.studentId,
      },
    });
    let result2 = await TermStudent.destroy({
      where: { studentId: data.studentId, termId: data.termId },
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

const findStudentsByUserNameOrFullName = async (term, search) => {
  const results = await Student.findAll({
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
        students: results,
      },
    };
  } else {
    return {
      status: -1,
      message: "Không tìm thấy dữ liệu!",
      data: {
        students: null,
      },
    };
  }
};

const findStudentsByName = async (page, limit, input) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Student.findAndCountAll({
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
          students: rows,
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
const getStudentGetAllGroup = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Group.findAndCountAll({
      attributes: ["id", "groupName", "numOfMembers", "status"],
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
        groups: rows,
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
const joinGroup = async (data) => {
  if (!data) {
    return {
      status: -1,
      message: "Dữ liệu không hợp lệ!",
    };
  }

  const checkStudentGroup = await Student.findOne({
    where: {
      id: data.studentId,
    },
  });
  const { groupId } = checkStudentGroup;
  if (groupId) {
    return {
      status: 1,
      message: "Bạn đã tham gia nhóm khác rồi!",
    };
  }
  const res = await Group.findOne({
    where: { id: data.groupId },
    attributes: { exclude: ["createdAt", "updatedAt", "TopicId"] },
    include: {
      model: Student,
      as: "students",
      attributes: ["id", "fullName"],
    },
  });

  if (!res) {
    return {
      status: 1,
      message: "Nhóm không tồn tại!",
      data: null,
    };
  }

  const { numOfMembers, id } = res;
  const students = res.students.length;

  if (students >= numOfMembers) {
    return {
      status: 1,
      message: "Nhóm đã đầy!",
    };
  }
  const isFirstStudent = students === 0;
  const update = await Student.update(
    { groupId: id, isLeader: isFirstStudent ? true : false },
    { where: { id: data.studentId } }
  );

  if (update[0] > 0) {
    if (students + 1 === numOfMembers) {
      await Group.update({ status: "FULL" }, { where: { id } });
    }

    return {
      status: 0,
      message: "Tham gia nhóm thành công!",
      data: res,
    };
  } else {
    return {
      status: 1,
      message: "Tham gia nhóm thất bại! Không tìm thấy sinh viên.",
      data: null,
    };
  }
};

const getInfoMyGroup = async (groupId) => {
  if (!groupId) {
    return {
      status: -1,
      message: "Dữ liệu không hợp lệ.",
      data: null,
    };
  }
  const res = await Group.findOne({
    where: {
      id: groupId,
    },
    attributes: { exclude: ["createdAt", "updatedAt", "TopicId"] },
    include: {
      model: Student,
      as: "students",
      attributes: [
        "id",
        "fullName",
        "email",
        "phone",
        "isLeader",
        "gender",
        "username",
      ],
    },
  });
  if (res) {
    return {
      status: 0,
      message: "Lấy thông tin nhóm thành công!",
      data: res,
    };
  } else {
    return {
      status: -1,
      message: "Không tìm thấy thông tin nhóm!",
      data: null,
    };
  }
};

const studentLeaveGroup = async (data) => {
  console.log("check data: ", data);
  if (!data) {
    return {
      status: -1,
      message: "Dữ liệu không hợp lệ!",
    };
  }
  const res = await Group.findOne({
    where: { id: data.groupId },
    include: {
      model: Student,
      as: "students",
    },
  });

  if (!res) {
    return {
      status: 1,
      message: "Nhóm không tồn tại!",
      data: null,
    };
  }

  const { id, numOfMembers } = res;
  const students = res.students.length;
  const student = await Student.findOne({
    where: {
      id: data.studentId,
    },
  });
  const { isLeader } = student;
  if (isLeader) {
    return {
      status: 1,
      message: "Bạn hãy chọn 1 thành viên khác làm nhóm trưởng",
    };
  }
  const update = await Student.update(
    { groupId: null },
    {
      where: { id: data.studentId },
    }
  );

  if (update[0] > 0) {
    if (students - 1 < numOfMembers) {
      await Group.update({ status: "NOT_FULL" }, { where: { id } });
    }

    return {
      status: 0,
      message: "Rời nhóm thành công!",
    };
  } else {
    return {
      status: -1,
      message: "Rời nhóm thất bại! Không tìm thấy sinh viên.",
      data: null,
    };
  }
};
const removeMemberFromGroup = async (data) => {
  const { groupId, studentId } = data;
  if (!groupId && !studentId) {
    return {
      status: -1,
      message: "Thông tin nhóm hoặc sinh viên cần xóa không hợp lệ!",
    };
  }
  const result = await studentLeaveGroup(data);

  if (result && result.status === 0) {
    return {
      status: 0,
      message: "Đã xóa thành viên khỏi nhóm!",
    };
  } else {
    return {
      status: -1,
      message: "Xóa thành viên khỏi nhóm thất bại!",
    };
  }
};
const transferTeamLeader = async (data) => {
  if (!data) {
    return {
      status: -1,
      message: "Dữ liệu không hợp lệ!",
    };
  }
  const { leaderId, memberId } = data;
  const leader = await Student.update(
    {
      isLeader: false,
    },
    {
      where: {
        id: leaderId,
      },
    }
  );
  const member = await Student.update(
    {
      isLeader: true,
    },
    {
      where: {
        id: memberId,
      },
    }
  );
  if (leader && member[0] > 0) {
    return {
      status: 0,
      message: "Chuyển quyền nhóm trưởng thành công!",
    };
  } else {
    return {
      status: -1,
      message: "Chuyển quyền nhóm trưởng thất bại!",
    };
  }
};

const getInfoMyTopic = async (topic) => {
  if (!topic) {
    return {
      status: -1,
      message: "Dữ liệu không hợp lệ!",
      data: null,
    };
  }
  const result = await Topic.findOne({
    where: {
      id: topic,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "LecturerId", "lecturerId"],
    },
    include: {
      model: Lecturer,
      as: "lecturer",
      attributes: ["id", "fullName", "email", "phone"],
    },
  });
  if (result) {
    return {
      status: 0,
      message: "Lấy thông tin đề tài thành công!",
      data: result,
    };
  } else {
    return {
      status: -1,
      message: "Không tìm thấy thông tin đề tài!",
      data: null,
    };
  }
};
const studentGetAllTopics = async (page, limit, term) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Topic.findAndCountAll({
      attributes: [
        "id",
        "title",
        "quantityGroup",
        "status",
        [
          literal(
            `(SELECT COUNT(*) FROM Groups WHERE Groups.topicId = Topic.id)`
          ),
          "groupCount",
        ],
      ],
      where: {
        termId: term,
      },
      offset: offset,
      limit: limit,
      include: {
        model: Lecturer,
        as: "lecturer",
        attributes: ["fullName", "gender"],
      },
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: 0,
      message: "Lấy danh sách thành công!",
      data: {
        totalRows: count,
        totalPages: totalPages,
        topics: rows,
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

const viewDetailsTopic = async (topicId) => {
  if (!topicId) {
    return {
      status: -1,
      message: "Dữ liệu không hợp lệ!",
    };
  }
  const result = await Topic.findOne({
    where: {
      id: topicId,
    },
    include: {
      model: Lecturer,
      as: "lecturer",
      attributes: ["fullName", "email"],
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "lecturerId", "LecturerId"],
    },
  });
  if (result) {
    return {
      status: 0,
      message: "Lấy thông tin chi tiết đề tài thành công!",
      data: result,
    };
  } else {
    return {
      status: -1,
      message: "Không tìm thấy thông tin đề tài!",
      data: null,
    };
  }
};

const joinTopic = async (data) => {
  if (!data.groupId) {
    return {
      status: -1,
      message: "Bạn chưa tham gia nhóm!",
    };
  }
  if (!data.topicId) {
    return {
      status: -1,
      message: "Không tìm thấy thông tin đề tài!",
    };
  }

  // Tìm Group
  const group = await Group.findOne({
    where: {
      id: data.groupId,
    },
  });

  if (!group) {
    return {
      status: -1,
      message: "Không tìm thấy nhóm!",
    };
  }

  const { topicId } = group;

  // Kiểm tra nếu nhóm đã có đề tài
  if (topicId) {
    return {
      status: -1,
      message:
        "Nhóm bạn đã có đề tài rồi. Hãy hủy trước khi đăng ký đề tài mới",
    };
  }

  // Kiểm tra thông tin topic
  const checkTopic = await Topic.findOne({
    where: { id: data.topicId },
    attributes: [
      "id",
      "quantityGroup",
      [
        literal(
          `(SELECT COUNT(*) FROM Groups WHERE Groups.topicId = Topic.id)`
        ),
        "groupCount",
      ],
    ],
    raw: true, // Trả về đối tượng đơn giản
  });

  if (!checkTopic) {
    return {
      status: -1,
      message: "Không tìm thấy thông tin đề tài!",
    };
  }

  const { quantityGroup, groupCount } = checkTopic;
  // Kiểm tra số lượng nhóm đã đăng ký
  if (groupCount >= quantityGroup) {
    return {
      status: -1,
      message: "Đề tài này đã đủ nhóm đăng ký!",
    };
  } else {
    // Cập nhật thông tin nhóm
    const update = await Group.update(
      { topicId: data.topicId },
      {
        where: {
          id: data.groupId,
        },
      }
    );
    if (update[0] > 0) {
      return {
        status: 0,
        message: "Đăng ký đề tài thành công!",
      };
    } else {
      return {
        status: -1,
        message: "Đăng ký đề tài thất bại!",
      };
    }
  }
};
const leaveTopic = async (data) => {
  const { studentId, groupId } = data;
  if (!studentId) {
    return {
      status: -1,
      message: "Thông tin sinh viên không hợp lê!",
    };
  }
  if (!groupId) {
    return {
      status: -1,
      message: "Thông tin nhóm không hợp lệ!",
    };
  }

  const isStudentLeader = await Student.findOne({
    where: {
      id: studentId,
    },
    raw: true,
  });
  if (!isStudentLeader) {
    return {
      status: -1,
      message: "Không tìm thấy thông tin sinh viên!",
    };
  }
  if (!isStudentLeader.isLeader) {
    return {
      status: -1,
      message: "Chỉ có nhóm trưởng mới có thể hủy đăng ký đề tài!",
    };
  } else {
    const updateGroup = await Group.update(
      {
        topicId: null,
      },
      {
        where: {
          id: groupId,
        },
      }
    );
    if (updateGroup[0] > 0) {
      return {
        status: 0,
        message: "Hủy đăng ký đề tài thành công!",
      };
    } else {
      return { status: -1, message: "Hủy đăng ký đề tài thất bại!" };
    }
  }
};
const searchTopicWithNameOrLecturer = async (search) => {
  if (!search) {
    return {
      status: -1,
      message: "Dữ liệu tìm kiếm không hợp lệ!",
    };
  }
  const results = await Topic.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { "$lecturer.fullName$": { [Op.like]: `%${search}%` } },
      ],
    },
    attributes: [
      "id",
      "title",
      "quantityGroup",
      "status",
      [
        literal(
          `(SELECT COUNT(*) FROM Groups WHERE Groups.topicId = Topic.id)`
        ),
        "groupCount",
      ],
    ],
    include: [
      {
        model: Lecturer,
        as: "lecturer",
        attributes: ["fullName", "gender"],
      },
    ],
  });
  if (!isEmpty(results)) {
    return {
      status: 0,
      message: "Tìm kiếm thành công!",
      data: {
        topics: results,
      },
    };
  } else {
    return {
      status: -1,
      message: "Không tìm thấy dữ liệu!",
      data: {
        topics: null,
      },
    };
  }
};
const getTerm = async (studentId) => {
  try {
    if (!studentId) {
      return {
        status: -1,
        message: "Không tìm thấy id sinh viên",
      };
    }
    let terms = await Term.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Student,
        as: "students",
        attributes: [],
        through: { attributes: [] },
        where: {
          id: studentId,
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
        error: error.message || "Có lỗi xảy ra",
      },
    };
  }
};
const getMajors = async () => {
  let majors = await Major.findAll(
    { attributes: { exclude: ["createdAt", "updatedAt"] } },
    { raw: true }
  );
  if (majors && !isEmpty(majors)) {
    return {
      status: 0,
      message: "Lấy danh chuyên ngành thành công!",
      data: majors,
    };
  } else {
    return {
      status: -1,
      message: "Lấy danh chuyên ngành thất bại!",
    };
  }
};

const getEvaluation = async (groupId, termId) => {
  if (!groupId) {
    return {
      status: -1,
      message: "Thông tin nhóm không tồn tại!",
    };
  }
  if (!termId) {
    return {
      status: -1,
      message: "Thông tin học kì không tồn tại!",
    };
  }

  try {
    let result = await Evaluation.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        groupId: groupId,
        termId: termId,
      },
      raw: true,
    });
    if (result) {
      return {
        status: 0,
        message: "Lấy thông tin điểm số thành công!",
        data: result,
      };
    } else {
      return {
        status: -1,
        message: "Không tìm thấy thông tin điểm số!",
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
module.exports = {
  createStudentAccount,
  createBulkAccount,
  getPaginationStudent,
  getStudentList,
  deleteStudent,
  updateStudent,
  deleteManyStudent,
  findStudentsByName,
  findStudentsByUserNameOrFullName,
  getStudentGetAllGroup,
  joinGroup,
  getInfoMyGroup,
  studentLeaveGroup,
  removeMemberFromGroup,
  transferTeamLeader,
  getInfoMyTopic,
  studentGetAllTopics,
  viewDetailsTopic,
  joinTopic,
  leaveTopic,
  searchTopicWithNameOrLecturer,
  getTerm,
  getNotes,
  getMajors,
  getEvaluation,
};
