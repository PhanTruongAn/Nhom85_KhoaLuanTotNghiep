import express from "express";
import helloController  from "../controllers/test";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  
  router.get("/",helloController.helloController)

 

  return app.use("/", router);
};
export default initWebRoutes;
