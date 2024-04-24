import { UserModel } from '../models/UserModel.js';
import { AuthenticationManager } from '../security/authentication/manager/AuthenticationManager.js';
import { PasswordManager } from '../security/passwords/PasswordManager.js'

export class UserService {

    /**
     * @param {UserModel} userModel 
     * @param {PasswordManager} passwordManager
     * @param {AuthenticationManager} authenticationManager
     */
    constructor(userModel, passwordManager, authenticationManager) {
        this.userModel = userModel;
        this.passwordManager = passwordManager;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Create a new account.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    async create(email, password) {
        const foundUser = await this.userModel.findOne({
            where: {
                email: email,
            }
        });

        if (foundUser) {
            throw new Error("User Already Registered");
        }

        const hashedPassword = await this.passwordManager.encrypt(password);

        return await this.userModel.create({
            email: email,
            password: hashedPassword,
        });
    }

    async login(email, password) {
        const foundUser = await this.userModel.findOne({
            where: {
                email: email,
            }
        });

        if (!foundUser) {
            throw new Error("User not found");
        }

        if (!this.passwordManager.verify(password, foundUser.password)) {
            throw new Error("Invalid password");
        }
        
        return this.authenticationManager.create(email, []);
    }
}