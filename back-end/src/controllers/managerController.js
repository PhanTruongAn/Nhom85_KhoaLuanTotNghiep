import service from "../services/managerService";
const handleGetAllPermission = async (req, res) => {
  if (req.query.page && req.query.limit) {
    const limit = req.query.limit;
    const page = req.query.page;
    const data = await service.paginationPermission(+page, +limit);
    return res.status(200).json(data);
  } else {
    const data = await service.getAllPermission();
    return res.status(200).json(data);
  }
};
const handleCreatePermission = async (req, res) => {
  try {
    const data = await service.createPermission(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleUpdatePermission = async (req, res) => {
  try {
    const data = await service.updatePermission(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeletePermission = async (req, res) => {
  try {
    const data = await service.deletePermission(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleFindByDescription = async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      const data = await service.findByDescription(search);
      return res.status(200).json(data);
    } else {
      return res.status(400).json({
        status: -1,
        message: "Dữ liệu truyền vào không hợp lệ!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetRolePermissions = async (req, res) => {
  try {
    const data = await service.getRolePermissions(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleAssignPermissions = async (req, res) => {
  try {
    const data = await service.assignPermissionsToRole(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleCreateGroupsStudent = async (req, res) => {
  try {
    const data = await service.createGroupsStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetAllGroupsStudent = async (req, res) => {
  try {
    const { limit, page, term } = req.query;
    const data = await service.paginationGroupsStudent(+page, +limit, term);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleFindGroupStudent = async (req, res) => {
  const { term, search } = req.query;
  try {
    const data = await service.findGroupByNameOrTopicTitle(term, search);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleCountStudent = async (req, res) => {
  try {
    const { term } = req.query;
    const data = await service.countStudent(term);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteGroupStudent = async (req, res) => {
  try {
    const data = await service.deleteGroupStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleCreateNewTerm = async (req, res) => {
  try {
    const data = await service.createNewTerm(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetTerms = async (req, res) => {
  try {
    const data = await service.getTerms();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleUpdateTerm = async (req, res) => {
  try {
    const data = await service.updateTerm(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleCreateMajor = async (req, res) => {
  try {
    const data = await service.createMajor(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetMajors = async (req, res) => {
  try {
    const data = await service.getMajors();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteMajor = async (req, res) => {
  try {
    const data = await service.deleteMajor(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleUpdateMajor = async (req, res) => {
  try {
    const data = await service.updateMajor(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleCreateNote = async (req, res) => {
  try {
    const data = await service.createNote(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetNotes = async (req, res) => {
  try {
    let { term } = req.query;
    const data = await service.getNotes(term);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteNote = async (req, res) => {
  try {
    let { id } = req.query;
    const data = await service.deleteNote(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleUpdateNote = async (req, res) => {
  try {
    const data = await service.updateNote(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetAllLecturerTopics = async (req, res) => {
  try {
    const { limit, page, term } = req.query;

    if (!limit || !page || !term) {
      return res.status(400).json({
        status: -1,
        message: "Thiếu thông tin cần thiết (limit, page, term).",
      });
    }

    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

    if (isNaN(limitNumber) || isNaN(pageNumber)) {
      return res.status(400).json({
        status: -1,
        message: "Limit và Page phải là số.",
      });
    }

    const data = await service.getAllLecturerTopics(
      pageNumber,
      limitNumber,
      term
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleFindTopicByTitleOrLecturerName = async (req, res) => {
  try {
    const { term, search } = req.query;
    if (search && term) {
      const data = await service.findTopicByTitleOrLecturerName(term, search);
      return res.status(200).json(data);
    } else {
      return res.status(400).json({
        status: -1,
        message: "Dữ liệu truyền vào không hợp lệ!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleAssignTopicToGroup = async (req, res) => {
  try {
    const data = await service.assignTopicToGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleCreateGroupLecturer = async (req, res) => {
  try {
    const data = await service.handleCreateGroupLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetGroupLecturer = async (req, res) => {
  try {
    const data = await service.getGroupLecturer();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetAllReviewGroupStudent = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const data = await service.paginationGroupsWithoutGroupLecturer(
      +page,
      +limit
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleAssignGroupLecturer = async (req, res) => {
  try {
    const data = await service.assignGroupLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleDeleteGroupLecturer = async (req, res) => {
  try {
    const data = await service.deleteLecturerGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteLecturerFromGroup = async (req, res) => {
  try {
    const data = await service.deleteLecturerFromGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleAddLecturerToGroup = async (req, res) => {
  try {
    const data = await service.addLecturerToGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetStatistics = async (req, res) => {
  try {
    const { termId } = req.query;
    const data = await service.getStatistics(termId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleGetAllGroupEvaluation = async (req, res) => {
  try {
    const { limit, page, term } = req.query;
    const data = await service.getAllGroupEvaluation(+page, +limit, term);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleFindEvaluation = async (req, res) => {
  const { term, search } = req.query;
  try {
    const data = await service.findEvaluationByGroupNameOrTopicTitle(
      term,
      search
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleEditEvaluation = async (req, res) => {
  try {
    const data = await service.editEvaluation(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteEvaluation = async (req, res) => {
  try {
    let { id } = req.query;
    const data = await service.deleteEvaluation(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
module.exports = {
  handleDeleteMajor,
  handleUpdateMajor,
  handleCreateMajor,
  handleGetMajors,
  handleGetAllPermission,
  handleCreatePermission,
  handleUpdatePermission,
  handleDeletePermission,
  handleFindByDescription,
  handleGetRolePermissions,
  handleAssignPermissions,
  handleCreateGroupsStudent,
  handleGetAllGroupsStudent,
  handleCountStudent,
  handleDeleteGroupStudent,
  handleCreateNewTerm,
  handleGetTerms,
  handleUpdateTerm,
  handleCreateNote,
  handleGetNotes,
  handleDeleteNote,
  handleUpdateNote,
  handleGetAllLecturerTopics,
  handleFindTopicByTitleOrLecturerName,
  handleAssignTopicToGroup,
  handleFindGroupStudent,
  handleCreateGroupLecturer,
  handleGetGroupLecturer,
  handleGetAllReviewGroupStudent,
  handleAssignGroupLecturer,
  handleDeleteGroupLecturer,
  handleDeleteLecturerFromGroup,
  handleAddLecturerToGroup,
  handleGetStatistics,
  handleGetAllGroupEvaluation,
  handleFindEvaluation,
  handleEditEvaluation,
  handleDeleteEvaluation,
};
