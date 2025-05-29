import express from "express";
import { LogIn, LogOut, signUp } from "../Controllers/Auth.controller.js";

const AuthRouter = express.Router();

import IsAuth from "../Middlewares/IsAuth.js";
import { getCurrentUser } from "../Controllers/User.controller.js";

AuthRouter.post("/signup", signUp);
AuthRouter.post("/signin", LogIn);
AuthRouter.get("/logout", LogOut);
// Add currentuser route for frontend context fetch
AuthRouter.get("/currentUser", IsAuth, getCurrentUser);

export default AuthRouter;
