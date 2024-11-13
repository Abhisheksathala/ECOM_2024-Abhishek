import {
  loginUser,
  RegisterUser,
  adminLogin,
} from './../Controllers/UserController.js';

import express from 'express';

const UserRouter = express.Router();

UserRouter.post('/register', RegisterUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/admin', adminLogin);

export default UserRouter;
