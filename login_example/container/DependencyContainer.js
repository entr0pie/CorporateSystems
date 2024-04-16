import { UserModel } from "../models/UserModel.js"
import { UserService } from "../services/UserService.js"
import { UserController } from "../controllers/UserController.js"

const userService = new UserService(UserModel);
const userController = new UserController(userService);

export const c = {
    UserController: userController,
    UserService: userService, 
};