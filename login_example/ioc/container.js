import { env } from "../config/env/EnvConfiguration.js";
import { UserModel } from "../models/UserModel.js";
import { PasswordManager } from "../security/passwords/PasswordManager.js";
import { BcryptPasswordManager } from "../security/passwords/bcrypt/BcryptPasswordManager.js";
import { UserService } from "../services/UserService.js";

const passwordManager = new BcryptPasswordManager(env.BCRYPT_SALT_ROUNDS);
const userService = new UserService(UserModel, passwordManager);

const container = {
    /**
     * @type {UserService}
     */
    UserService: userService,
    
    /**
     * @type {PasswordManager}
     */
    PasswordManager: passwordManager,
};

export const ioc = container; 