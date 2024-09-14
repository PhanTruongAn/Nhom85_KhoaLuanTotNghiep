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
  // User route
  router.post("/login", userController.handlerLogin);
  router.post("/create-student", userController.handlerCreateStudentAccount);
  router.post("/create-lecturer", userController.handlerCreateLecturerAccount);
  router.get("/fetch-token", userController.handlerGetDataFromToken);
  router.post("/log-out", userController.handlerLogOut);
  router.post("/bulk-create-student", userController.handlerBulkCreate);
  router.post(
    "/bulk-create-lecturer",
    userController.handlerBulkCreateLecturer
  );
  return app.use("/", router);
};
export default initWebRoutes;
