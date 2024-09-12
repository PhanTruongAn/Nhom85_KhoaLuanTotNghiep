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
  router.post("/createStudent", userController.handlerCreateStudentAccount);
  router.post("/createLecturer", userController.handlerCreateLecturerAccount);
  router.get("/fetch-token", userController.handlerGetDataFromToken);
  router.post("/log-out", userController.handlerLogOut);
  return app.use("/", router);
};
export default initWebRoutes;
