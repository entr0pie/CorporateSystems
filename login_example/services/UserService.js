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

    async login(email, password) {
        const user = await this.userModel.findOne({
            where: {
                email: email
            }
        });

        if (user && user.password == password) {
            return user.email;
        };

        throw new Error("Invalid Password");
    }

    async findByID(id) {
        return await this.userModel.findByPk(id);
    }
}