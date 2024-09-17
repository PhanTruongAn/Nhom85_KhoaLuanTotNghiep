import express from "express";
import userController from "../controllers/userController";
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
  router.post("/login", userController.handlerLogin);
  router.get("/fetch-token", userController.handlerGetDataFromToken);
  router.post("/log-out", userController.handlerLogOut);
  //Student route
  router.post(
    "/student/create-student",
    userController.handlerCreateStudentAccount
  );
  router.post("/student/bulk-create-student", userController.handlerBulkCreate);
  router.get("/student/get-all", userController.handlerStudentGetAll);
  router.delete("/student/delete", userController.handlerDeleteStudent);
  router.put("/student/update", userController.handlerUpdateStudent);
  //Lecturer route
  router.post(
    "/lecturer/create-lecturer",
    userController.handlerCreateLecturerAccount
  );
  router.post(
    "/lecturer/bulk-create-lecturer",
    userController.handlerBulkCreateLecturer
  );
  router.get("/lecturer/get-all", userController.handlerLecturerGetAll);
  return app.use("/", router);
};
export default initWebRoutes;
