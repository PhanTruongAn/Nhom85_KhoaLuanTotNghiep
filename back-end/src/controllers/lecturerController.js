import lecturerService from "../services/lecturerService";
import _ from "lodash";

const handleCreateLecturerAccount = async (req, res) => {
  try {
    let data = await lecturerService.createLecturerAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handleBulkCreateLecturer = async (req, res) => {
  try {
    let data = await lecturerService.createBulkAccountLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const handleLecturerGetAll = async (req, res) => {
  if (req.query.page && req.query.limit) {
    let limit = req.query.limit;
    let page = req.query.page;
    const data = await lecturerService.getPaginationLecturer(+page, +limit);
    return res.status(200).json(data);
  } else {
    let data = await lecturerService.getLecturerList();
    return res.status(200).json(data);
  }
};
const handleDeleteLecturer = async (req, res) => {
  try {
    let data = await lecturerService.deleteLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handleUpdateLecturer = async (req, res) => {
  try {
    let data = await lecturerService.updateLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteManyLecturer = async (req, res) => {
  try {
    let data = await lecturerService.deleteManyLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handleFindLecturersByName = async (req, res) => {
  const { page, limit, input } = req.query;
  if (page && limit && input) {
    const data = await lecturerService.findLecturersByName(
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
const handleFindLecturersByUserNameOrFullName = async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const data = await lecturerService.findLecturersByUserNameOrFullName(
        search
      );
      return res.status(200).json(data);
    } else {
      return res.status(400).json({
        status: -1,
        message: "Dữ liệu truyền vào không hợp lệ!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: -1,
      message: "Lỗi hệ thống!",
    });
  }
};
const handleCreateTopics = async (req, res) => {
  try {
    let data = await lecturerService.createTopics(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetTerm = async (req, res) => {
  try {
    let { id } = req.query;
    let data = await lecturerService.getTerm(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 1,
      message: "Lỗi từ server!",
    });
  }
};
module.exports = {
  handleCreateLecturerAccount,
  handleBulkCreateLecturer,
  handleLecturerGetAll,
  handleDeleteLecturer,
  handleUpdateLecturer,
  handleDeleteManyLecturer,
  handleFindLecturersByName,
  handleFindLecturersByUserNameOrFullName,
  handleCreateTopics,
  handleGetTerm,
};
