import express from "express";
import userController from "../controllers/userController";
import studentController from "../controllers/studentController";
import lecturerController from "../controllers/lecturerController";
import roleController from "../controllers/roleController";
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
  return app.use("/", router);
};
export default initWebRoutes;
