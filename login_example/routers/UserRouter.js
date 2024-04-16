
import { Router } from 'express';
import { UserModel } from '../models/UserModel.js';
import { UserService } from '../services/UserService.js';
import { UserController } from '../controllers/UserController.js';

const userRouter = Router();
const userService = new UserService(UserModel);
const userController = new UserController(userService); 

userRouter.post("", userController.register.bind(userController));

export const UserRouter = userRouter;