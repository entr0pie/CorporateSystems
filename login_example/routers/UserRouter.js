
import { Router } from 'express';
import { ioc } from '../ioc/container.js';
import { UserController } from '../controllers/UserController.js';

const userRouter = Router();
const userController = new UserController(ioc.UserService); 

userRouter.post("/register", userController.register.bind(userController));
userRouter.post("/login", userController.login.bind(userController));
userRouter.get("", ioc.filters.Authenticated, userController.getAllUsers.bind(userController));

export const UserRouter = userRouter;