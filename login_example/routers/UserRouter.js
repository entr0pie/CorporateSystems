
import { Router } from 'express';
import { c } from '../container/DependencyContainer.js'; 

const userRouter = Router();

userRouter.post("", c.UserController.register.bind(c.UserController));
userRouter.post("/login", c.UserController.login.bind(c.UserController));
userRouter.get("/search", c.UserController.findByID.bind(c.UserController));

export const UserRouter = userRouter;