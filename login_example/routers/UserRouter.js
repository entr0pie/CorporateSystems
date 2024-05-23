
import { Router } from 'express';
import { ioc } from '../ioc/container.js';
import { UserController } from '../controllers/UserController.js';
import { RequestValidator } from '../security/validators/RequestValidator.js';
import { body, query } from 'express-validator';

const userRouter = Router();
const userController = new UserController(ioc.UserService);

userRouter.post("/register",
    RequestValidator(
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isString(),
        body('departmentId').notEmpty().isNumeric().toInt(),
    ),
    userController.register.bind(userController)
);

userRouter.post("/login",
    RequestValidator(
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isString(),
    ),
    userController.login.bind(userController)
);

userRouter.get("",
    ioc.filters.Authenticated,
    RequestValidator(
        query('page').notEmpty().isNumeric().toInt(),
        query('size').notEmpty().isNumeric().toInt(),
    ),
    userController.getAllUsers.bind(userController)
);

export const UserRouter = userRouter;