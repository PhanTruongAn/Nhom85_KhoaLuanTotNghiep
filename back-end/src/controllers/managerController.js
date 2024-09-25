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
    return res.status(500).json({
      status: -1,
      message: "Lỗi hệ thống!",
      data: {
        error: error,
      },
    });
  }
};
const handleUpdatePermission = async (req, res) => {
  try {
    const data = await service.updatePermission(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: -1,
      message: "Lỗi hệ thống!",
      data: {
        error: error,
      },
    });
  }
};
const handleDeletePermission = async (req, res) => {
  try {
    const data = await service.deletePermission(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: -1,
      message: "Lỗi hệ thống!",
      data: {
        error: error,
      },
    });
  }
};
module.exports = {
  handleGetAllPermission,
  handleCreatePermission,
  handleUpdatePermission,
  handleDeletePermission,
};
