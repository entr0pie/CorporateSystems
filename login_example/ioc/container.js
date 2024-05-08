import { env } from "../config/env/EnvConfiguration.js";
import { ProductModel } from "../models/ProductModel.js";
import { UserModel } from "../models/UserModel.js";
import { JwtManager } from "../security/authentication/jwt/JwtManager.js";
import { AuthenticationManager } from "../security/authentication/manager/AuthenticationManager.js";
import { PasswordManager } from "../security/passwords/PasswordManager.js";
import { BcryptPasswordManager } from "../security/passwords/bcrypt/BcryptPasswordManager.js";
import { ProductService } from "../services/ProductService.js";
import { UserService } from "../services/UserService.js";
import { AuthenticationFilter } from "../security/authentication/filters/AuthenticationFilter.js"
import { DepositService } from "../services/DepositService.js";
import { DepositModel } from "../models/DepositModel.js";

const passwordManager = new BcryptPasswordManager(env.BCRYPT_SALT_ROUNDS);
const authenticationManager = new JwtManager(env.JWT_SECRET);
const userService = new UserService(UserModel, passwordManager, authenticationManager);
const productService = new ProductService(ProductModel);
const depositService = new DepositService(DepositModel);

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

    /**
     * @type {ProductService}
     */
    ProductService: productService,

    /**
     * @type {DepositService}
     */
    DepositService: depositService,

    filters: {
        Authenticated: AuthenticationFilter(),
    }
};

export const ioc = container; 