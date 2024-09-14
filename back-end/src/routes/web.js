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

  //Lecturer route
  router.post(
    "/lecturer/create-lecturer",
    userController.handlerCreateLecturerAccount
  );
  router.post(
    "/lecturer/bulk-create-lecturer",
    userController.handlerBulkCreateLecturer
  );
  return app.use("/", router);
};
export default initWebRoutes;
