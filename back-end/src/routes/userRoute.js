import express from "express";
const router = express.Router();
import userController from "../controllers/userController";
const userRoute = (app) => {
  router.post("/login", userController.handlerLogin);
  router.post("/createStudent", userController.handlerCreateStudentAccount);
  router.post("/createLecturer", userController.handlerCreateLecturerAccount);
  return app.use("/", router);
};
export default userRoute;
