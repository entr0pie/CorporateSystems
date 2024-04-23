
import { Router } from 'express';
import { ioc } from '../ioc/container.js';
import { UserController } from '../controllers/UserController.js';

const userRouter = Router();
const userController = new UserController(ioc.UserService); 

userRouter.post("", userController.register.bind(userController));

export const UserRouter = userRouter;