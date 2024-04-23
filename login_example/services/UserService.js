import { UserModel } from '../models/UserModel.js';
import { PasswordManager } from '../security/passwords/PasswordManager.js'

export class UserService {

    /**
     * @param {UserModel} userModel 
     * @param {PasswordManager} passwordManager
     */
    constructor(userModel, passwordManager) {
        this.userModel = userModel;
        this.passwordManager = passwordManager;
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
}