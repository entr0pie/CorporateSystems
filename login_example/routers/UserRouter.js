
import { Router } from 'express';
import { ioc } from '../ioc/container.js';
import { UserController } from '../controllers/UserController.js';
import { AuthenticationFilter } from '../security/authentication/filters/AuthenticationFilter.js' 

const userRouter = Router();
const userController = new UserController(ioc.UserService); 

userRouter.post("/register", userController.register.bind(userController));
userRouter.post("/login", userController.login.bind(userController));
userRouter.get("", AuthenticationFilter(), userController.getAllUsers.bind(userController));

export const UserRouter = userRouter;