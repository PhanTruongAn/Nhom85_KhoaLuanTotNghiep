import express from "express";
import userController from "../controllers/userController";
import studentController from "../controllers/studentController";
import lecturerController from "../controllers/lecturerController";
import roleController from "../controllers/roleController";
import managerController from "../controllers/managerController";
import {
  authentication,
  checkUserPermission,
} from "../middleware/authentication";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.all("*", authentication, checkUserPermission);
  // Authenticate route
  router.post("/login", userController.handleLogin);
  router.get("/fetch-token", userController.handleGetDataFromToken);
  router.post("/log-out", userController.handleLogOut);
  router.post("/find-account", userController.handleFindAccount);
  router.put("/send-email", userController.handleSendEmail);
  //

  //Student route
  router.post(
    "/student/create-student",
    studentController.handleCreateStudentAccount
  );
  router.post(
    "/student/bulk-create-student",
    studentController.handleBulkCreate
  );
  router.get("/student/get-all", studentController.handleStudentGetAll);
  router.delete("/student/delete", studentController.handleDeleteStudent);
  router.put("/student/update", studentController.handleUpdateStudent);
  router.delete(
    "/student/delete-many",
    studentController.handleDeleteManyStudent
  );
  router.get(
    "/student/find-by-username",
    studentController.handleFindStudentsByUserName
  );
  router.get(
    "/student/find-by-name",
    studentController.handleFindStudentsByName
  );
  router.put("/student/change-password", userController.handleChangePassword);
  router.get("/find-account", userController.handleFindAccount);
  //Lecturer route
  router.post(
    "/lecturer/create-lecturer",
    lecturerController.handleCreateLecturerAccount
  );
  router.post(
    "/lecturer/bulk-create-lecturer",
    lecturerController.handleBulkCreateLecturer
  );
  router.get("/lecturer/get-all", lecturerController.handleLecturerGetAll);
  router.get("/lecturer/get-roles", roleController.handleGetRolesForLecturer);
  router.delete("/lecturer/delete", lecturerController.handleDeleteLecturer);
  router.put("/lecturer/update", lecturerController.handleUpdateLecturer);
  router.delete(
    "/lecturer/delete-many",
    lecturerController.handleDeleteManyLecturer
  );
  router.get(
    "/lecturer/find-by-username",
    lecturerController.handleFindLecturersByUserName
  );
  router.get(
    "/lecturer/find-by-name",
    lecturerController.handleFindLecturersByName
  );
  router.put("/lecturer/change-password", userController.handleChangePassword);
  router.post("/lecturer/create-topic", lecturerController.handleCreateTopics);

  //Manager Route
  router.get(
    "/manager/get-all-permission",
    managerController.handleGetAllPermission
  );
  router.post(
    "/manager/create-permission",
    managerController.handleCreatePermission
  );
  router.put(
    "/manager/update-permission",
    managerController.handleUpdatePermission
  );
  router.delete(
    "/manager/delete-permission",
    managerController.handleDeletePermission
  );
  router.get(
    "/manager/find-permission",
    managerController.handleFindByDescription
  );
  router.post(
    "/manager/get-role-permissions",
    managerController.handleGetRolePermissions
  );
  router.post(
    "/manager/assign-permissions",
    managerController.handleAssignPermissions
  );
  router.post(
    "/manager/create-groups-student",
    managerController.handleCreateGroupsStudent
  );
  router.get(
    "/manager/get-groups-student",
    managerController.handleGetAllGroupsStudent
  );

  return app.use("/", router);
};
export default initWebRoutes;
