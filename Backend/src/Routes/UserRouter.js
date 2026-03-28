import auth from '../Middleware/auth.js';
import {
  loginUser,
  RegisterUser,
  adminLogin,
  getUserProfile,
  google
} from './../Controllers/UserController.js';

import express from 'express';

const UserRouter = express.Router();

UserRouter.post('/register', RegisterUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/google', google);
UserRouter.post('/admin', adminLogin);
UserRouter.get("/profile", auth, getUserProfile);

export default UserRouter;
