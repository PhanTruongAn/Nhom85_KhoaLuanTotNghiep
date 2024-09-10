import express from "express";
import userRoute from "./userRoute";
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
  // userRoute(app);
  router.post("/login", userController.handlerLogin);
  router.post("/createStudent", userController.handlerCreateStudentAccount);
  router.post("/createLecturer", userController.handlerCreateLecturerAccount);
  router.get("/fetch-token", userController.handlerGetDataFromToken);

  return app.use("/", router);
};
export default initWebRoutes;
