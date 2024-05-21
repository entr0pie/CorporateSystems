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
import { ProductMovementService } from "../services/ProductMovementService.js";
import { ProductMovementModel } from "../models/ProductMovementModel.js";
import { DepartmentService } from "../services/DepartmentService.js";
import { DepartmentModel } from "../models/DepartmentModel.js";
import { SuplierModel } from "../models/SuplierModel.js";
import { SuplierService } from "../services/SuplierService.js";
import { CostCenterModel } from "../models/CostCenterModel.js";
import { CostCenterService } from "../services/CostCenterService.js";
import { PurchaseRequestService } from "../services/PurchaseRequestService.js";
import { PurchaseRequestModel } from "../models/PurchaseRequestModel.js";

const passwordManager = new BcryptPasswordManager(env.BCRYPT_SALT_ROUNDS);
const authenticationManager = new JwtManager(env.JWT_SECRET);
const userService = new UserService(UserModel, passwordManager, authenticationManager);
const productService = new ProductService(ProductModel);
const depositService = new DepositService(DepositModel);
const productMovementService = new ProductMovementService(ProductMovementModel);
const departmentService = new DepartmentService(DepartmentModel);
const suplierService = new SuplierService(SuplierModel);
const costCenterService = new CostCenterService(CostCenterModel);
const purchaseRequestService = new PurchaseRequestService(productMovementService, productService, userService, costCenterService, PurchaseRequestModel);

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

    /**
     * @type {ProductMovementService}
     */
    ProductMovementService: productMovementService,

    /**
     * @type {DepartmentService}
     */
    DepartmentService: departmentService,

    /**
     * @type {SuplierService}
     */
    SuplierService: suplierService,

    /**
     * @type {CostCenterService}
     */
    CostCenterService: costCenterService,

    /**
     * @type {PurchaseRequestService}
     */
    PurchaseRequestService: purchaseRequestService,

    filters: {
        Authenticated: AuthenticationFilter(),
    }
};

export const ioc = container; 