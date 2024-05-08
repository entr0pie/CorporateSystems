import { DepositModel } from "../models/DepositModel.js";

export class DepositService {

    /**
     * @param {DepositModel} depositModel 
     */
    constructor(depositModel) {
        this.depositModel = depositModel;
    }

    /**
     * @param {string} name 
     */
    async create(name) {
        return await this.depositModel.create({ name: name });
    }

    /**
     * @param {number} id 
     * @param {string} name ser
     */
    async update(id, name) {
        const deposit = await this.depositModel.findByPk(id);

        if (!deposit) {
            throw new Error("Deposit not found");
        }

        deposit.set({
            name: name,
        });

        return await deposit.save();
    }

    /**
     * @param {number} page 
     * @param {number} size  
     */
    async findAll(page, size) {
        const offset = page * size;
        return await this.depositModel.findAll({limit: size, offset: offset});
    }

    /**
     * @param {number} id 
     */
    async findById(id) {
        return await this.depositModel.findByPk(id);
    }
}