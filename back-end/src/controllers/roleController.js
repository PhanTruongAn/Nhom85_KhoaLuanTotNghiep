import permissionService from "../services/roleService";

// const handlerGetAllGroup = async (req, res) => {
//   try {
//     const data = await groupService.getAllGroup();
//     return res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       EC: 1,
//       EM: "Error from server",
//     });
//   }
// };
const handlerGetPermissions = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await permissionService.getPermissions(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: -1,
      message: "Error from server!",
      data: null,
    });
  }
};
module.exports = {
  handlerGetPermissions,
};
