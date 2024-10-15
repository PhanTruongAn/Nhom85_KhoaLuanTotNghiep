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
      message: "Lỗi hệ thống!",
    });
  }
};
const handleGetRolePermissions = async (req, res) => {
  try {
    const data = await service.getRolePermissions(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: -1,
      message: "Lỗi hệ thống!",
      data: null,
    });
  }
};
const handleAssignPermissions = async (req, res) => {
  try {
    const data = await service.assignPermissionsToRole(req.body);
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
const handleCreateGroupsStudent = async (req, res) => {
  try {
    const data = await service.createGroupsStudent(req.body);
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
const handleGetAllGroupsStudent = async (req, res) => {
  if (req.query.page && req.query.limit) {
    const limit = req.query.limit;
    const page = req.query.page;
    const data = await service.paginationGroupsStudent(+page, +limit);
    return res.status(200).json(data);
  } else {
    return res.status(400).json({
      status: -1,
      message: "Lỗi chức năng!",
      data: null,
    });
  }
};
const handleCountStudent = async (req, res) => {
  try {
    const data = await service.countStudent();
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
const handleDeleteGroupStudent = async (req, res) => {
  try {
    const data = await service.deleteGroupStudent(req.body);
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
  handleFindByDescription,
  handleGetRolePermissions,
  handleAssignPermissions,
  handleCreateGroupsStudent,
  handleGetAllGroupsStudent,
  handleCountStudent,
  handleDeleteGroupStudent,
};
