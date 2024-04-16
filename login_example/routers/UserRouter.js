
import { Router } from 'express';
import { c } from '../container/DependencyContainer'; 

const userRouter = Router();

userRouter.post("/user", c.UserController.register.bind(c.UserController));

export const UserRouter = userRouter;