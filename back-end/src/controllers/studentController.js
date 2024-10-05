import studentService from "../services/studentService";
import _ from "lodash";

const handleCreateStudentAccount = async (req, res) => {
  try {
    const data = await studentService.createStudentAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handleBulkCreate = async (req, res) => {
  try {
    let data = await studentService.createBulkAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handleStudentGetAll = async (req, res) => {
  if (req.query.page && req.query.limit) {
    let limit = req.query.limit;
    let page = req.query.page;
    const data = await studentService.getPaginationStudent(+page, +limit);
    return res.status(200).json(data);
  } else {
    let data = await studentService.getStudentList();
    return res.status(200).json(data);
  }
};

const handleDeleteStudent = async (req, res) => {
  try {
    let data = await studentService.deleteStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateStudent = async (req, res) => {
  try {
    const data = await studentService.updateStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteManyStudent = async (req, res) => {
  try {
    let data = await studentService.deleteManyStudent(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
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
const handleFindStudentsByUserName = async (req, res) => {
  const { page, limit, input } = req.query;
  if (page && limit && input) {
    const data = await studentService.findStudentsByUserName(
      +page,
      +limit,
      input
    );
    return res.status(200).json(data);
  } else {
    return res.status(400).json({
      status: 1,
      message: "Dữ liệu truyền vào không hợp lệ!",
    });
  }
};
const handleStudentGetAllGroup = async (req, res) => {
  const { page, limit } = req.query;
  if (page && limit) {
    const data = await studentService.getStudentGetAllGroup(+page, +limit);
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
  }
};
module.exports = {
  handleCreateStudentAccount,
  handleBulkCreate,
  handleStudentGetAll,
  handleDeleteStudent,
  handleUpdateStudent,
  handleDeleteManyStudent,
  handleFindStudentsByUserName,
  handleFindStudentsByName,
  handleStudentGetAllGroup,
  handleJoinGroup,
};
