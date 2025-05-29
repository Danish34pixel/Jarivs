import express from "express";
import {
  askToAssistant,
  getCurrentUser,
  updateassisment,
} from "../Controllers/User.controller.js";
import IsAuth from "../Middlewares/IsAuth.js";
import { upload } from "../Middlewares/Multer.js";
import User from "../Models/User.model.js";
import isAuth from "../Middlewares/IsAuth.js";

const UserRouter = express.Router();

UserRouter.get("/current", IsAuth, getCurrentUser);
UserRouter.post(
  "/updateassisment",
  IsAuth,
  upload.single("modelFile"),
  updateassisment
);

UserRouter.post("/askToAssistant", isAuth, askToAssistant);
export default UserRouter;
