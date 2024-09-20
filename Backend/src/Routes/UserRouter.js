import {
  loginUser,
  RegisterUser,
  AdminLogin,
} from "./../Controllers/UserController.js";

import express from "express";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/register", RegisterUser);
UserRouter.post("/admin", AdminLogin);

export default UserRouter;
