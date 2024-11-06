import lecturerService from "../services/lecturerService";
import _ from "lodash";

const handleCreateLecturerAccount = async (req, res) => {
  try {
    let data = await lecturerService.createLecturerAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleBulkCreateLecturer = async (req, res) => {
  try {
    let data = await lecturerService.createBulkAccountLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleLecturerGetAll = async (req, res) => {
  const { limit, page, term } = req.query;
  if (limit && page && term) {
    const data = await lecturerService.getPaginationLecturer(
      +page,
      +limit,
      term
    );
    return res.status(200).json(data);
  } else {
    return res.status(200).json({
      status: -1,
      message: "Thiếu dữ liệu phân trang hoặc học kì!",
    });
  }
};
const handleDeleteLecturer = async (req, res) => {
  try {
    let data = await lecturerService.deleteLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleUpdateLecturer = async (req, res) => {
  try {
    let data = await lecturerService.updateLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteManyLecturer = async (req, res) => {
  try {
    let data = await lecturerService.deleteManyLecturer(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
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
      status: -1,
      message: "Dữ liệu truyền vào không hợp lệ!",
    });
  }
};
const handleFindLecturersByUserNameOrFullName = async (req, res) => {
  try {
    const { term, search } = req.query;
    if (search && term) {
      const data = await lecturerService.findLecturersByUserNameOrFullName(
        term,
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
      status: -1,
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
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetPersonalTopics = async (req, res) => {
  try {
    let { term, id } = req.query;
    let data = await lecturerService.getPersonalTopics(term, id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleDeleteTopic = async (req, res) => {
  try {
    let data = await lecturerService.deleteTopic(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleUpdateTopic = async (req, res) => {
  try {
    let data = await lecturerService.updateTopic(req.body);
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
    const data = await lecturerService.getNotes(term, role);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handlePointGroup = async (req, res) => {
  try {
    let data = await lecturerService.pointGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};
const handleGetGroupTopic = async (req, res) => {
  try {
    const { lecturer, term } = req.query;
    const data = await lecturerService.getGroupTopic(lecturer, term);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: -1,
      message: "Lỗi từ server!",
    });
  }
};

const handleReviewLecturers = async (req, res) => {
  try {
    const { term } = req.query;
    const data = await lecturerService.getLecturerList(term);
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
  handleGetPersonalTopics,
  handleDeleteTopic,
  handleUpdateTopic,
  handleGetNotes,
  handlePointGroup,
  handleGetGroupTopic,
  handleReviewLecturers,
};
