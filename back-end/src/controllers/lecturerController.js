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
module.exports = {
  handleCreateLecturerAccount,
  handleBulkCreateLecturer,
  handleLecturerGetAll,
  handleDeleteLecturer,
  handleUpdateLecturer,
  handleDeleteManyLecturer,
};
