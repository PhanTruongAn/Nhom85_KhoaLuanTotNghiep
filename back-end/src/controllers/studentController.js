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
    let data = await studentService.updateStudent(req.body);
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
};
