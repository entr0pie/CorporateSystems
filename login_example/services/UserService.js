import { UserModel } from '../models/UserModel.js';

export class UserService {

    /**
     * @param {UserModel} userModel 
     */
    constructor(userModel) {
        this.userModel = userModel;
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

        return await this.userModel.create({
            email: email,
            password: password,
        });
    }
}