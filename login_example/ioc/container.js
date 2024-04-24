import { env } from "../config/env/EnvConfiguration.js";
import { UserModel } from "../models/UserModel.js";
import { JwtManager } from "../security/authentication/jwt/JwtManager.js";
import { AuthenticationManager } from "../security/authentication/manager/AuthenticationManager.js";
import { PasswordManager } from "../security/passwords/PasswordManager.js";
import { BcryptPasswordManager } from "../security/passwords/bcrypt/BcryptPasswordManager.js";
import { UserService } from "../services/UserService.js";

const passwordManager = new BcryptPasswordManager(env.BCRYPT_SALT_ROUNDS);
const authenticationManager = new JwtManager(env.JWT_SECRET);
const userService = new UserService(UserModel, passwordManager, authenticationManager);

const container = {
    /**
     * @type {UserService}
     */
    UserService: userService,
    
    /**
     * @type {PasswordManager}
     */
    PasswordManager: passwordManager,

    /**
     * @type {AuthenticationManager}
     */
    AuthenticationManager: authenticationManager,
};

export const ioc = container; 