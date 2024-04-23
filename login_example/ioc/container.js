import { UserModel } from "../models/UserModel.js";
import { UserService } from "../services/UserService.js";

const userService = new UserService(UserModel);

const container = {
    UserService: userService,
};

export const ioc = container; 