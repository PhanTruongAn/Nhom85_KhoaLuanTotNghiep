import studentService from "../services/studentService";
import _ from "lodash";

const handleCreateStudentAccount = async (req, res) => {
  try {
    const data = await studentService.createStudentAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleBulkCreate = async (req, res) => {
  try {
    let data = await studentService.createBulkAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleStudentGetAll = async (req, res) => {
  if (req.query.page && req.query.limit && req.query.term) {
    let limit = req.query.limit;
    let page = req.query.page;
    let term = req.query.term;
    const data = await studentService.getPaginationStudent(+page, +limit, term);
    return res.status(200).json(data);
  } else {
    let data = await studentService.getStudentList(term);
    return res.status(200).json(data);
  }
};

const handleDeleteStudent = async (req, res) => {
  try {
    let data = await studentService.deleteStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleUpdateStudent = async (req, res) => {
  try {
    const data = await studentService.updateStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteManyStudent = async (req, res) => {
  try {
    let data = await studentService.deleteManyStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleFindStudentsByName = async (req, res) => {
  const { page, limit, input } = req.query;
  if (page && limit && input) {
    const data = await studentService.findStudentsByName(+page, +limit, input);
    return res.status(200).json(data);
  } else {
    return res.status(400).json({
      status: 1,
      message: "Dữ liệu truyền vào không hợp lệ!",
    });
  }
};
const handleFindStudentsByUserNameOrFullName = async (req, res) => {
  try {
    const { term, search } = req.query;
    if (search && term) {
      const data = await studentService.findStudentsByUserNameOrFullName(
        term,
        search
      );
      return res.status(200).json(data);
    } else {
      return res.status(400).json({
        status: -1,
        message: "Dữ liệu nhập vào không hợp lệ!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: -1,
      message: "Lỗi hệ thống!",
    });
  }
};
const handleStudentGetAllGroup = async (req, res) => {
  const { page, limit, term } = req.query;
  if (page && limit && term) {
    const data = await studentService.getStudentGetAllGroup(
      +page,
      +limit,
      term
    );
    return res.status(200).json(data);
  } else {
    return res.status(400).json({
      status: 1,
      message: "Dữ liệu truyền vào không hợp lệ!",
    });
  }
};
const handleJoinGroup = async (req, res) => {
  try {
    const data = await studentService.joinGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetInfoMyGroup = async (req, res) => {
  try {
    const { student, term } = req.query;
    const data = await studentService.getInfoMyGroup(student, term);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGStudentLeaveGroup = async (req, res) => {
  try {
    const data = await studentService.studentLeaveGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleRemoveMemberFromGroup = async (req, res) => {
  try {
    const data = await studentService.removeMemberFromGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleTransferTeamLeader = async (req, res) => {
  try {
    const data = await studentService.transferTeamLeader(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetInfoMyTopic = async (req, res) => {
  try {
    const { topic } = req.query;
    const data = await studentService.getInfoMyTopic(topic);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleStudentGetAllTopics = async (req, res) => {
  const { page, limit, term } = req.query;
  if (page && limit && term) {
    const data = await studentService.studentGetAllTopics(+page, +limit, term);
    return res.status(200).json(data);
  } else {
    return res.status(400).json({
      status: 1,
      message: "Dữ liệu truyền vào không hợp lệ!",
    });
  }
};
const handleGetDetailsTopic = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await studentService.viewDetailsTopic(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleJoinTopic = async (req, res) => {
  try {
    const data = await studentService.joinTopic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleLeaveTopic = async (req, res) => {
  try {
    const data = await studentService.leaveTopic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleSearchTopicWithNameOrLecturer = async (req, res) => {
  try {
    const { search } = req.query;
    const data = await studentService.searchTopicWithNameOrLecturer(search);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetTerm = async (req, res) => {
  try {
    const { student } = req.query;
    const data = await studentService.getTerm(student);
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
    const { term, role } = req.query;
    const data = await studentService.getNotes(term, role);
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
    const data = await studentService.getMajors();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleGetEvaluation = async (req, res) => {
  try {
    const { term, group } = req.query;
    const data = await studentService.getEvaluation(term, group);
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
  handleCreateStudentAccount,
  handleBulkCreate,
  handleStudentGetAll,
  handleDeleteStudent,
  handleUpdateStudent,
  handleDeleteManyStudent,
  handleFindStudentsByUserNameOrFullName,
  handleFindStudentsByName,
  handleStudentGetAllGroup,
  handleJoinGroup,
  handleGetInfoMyGroup,
  handleGStudentLeaveGroup,
  handleRemoveMemberFromGroup,
  handleTransferTeamLeader,
  handleGetInfoMyTopic,
  handleStudentGetAllTopics,
  handleGetDetailsTopic,
  handleJoinTopic,
  handleLeaveTopic,
  handleSearchTopicWithNameOrLecturer,
  handleGetTerm,
  handleGetNotes,
  handleGetMajors,
  handleGetEvaluation,
};
