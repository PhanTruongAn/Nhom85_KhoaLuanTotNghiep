import service from "../services/permissionService";
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

module.exports = {
  handleGetAllPermission,
};
