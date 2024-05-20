import { CostCenterModel } from "../models/CostCenterModel.js";

export class CostCenterService {

    /**
     * @param {CostCenterModel} costCenterModel 
     */
    constructor(costCenterModel) {
        this.costCenterModel = costCenterModel;
    }

    /**
     * @param {number} id 
     * @returns 
     */
    async findById(id) {
        return this.costCenterModel.findByPk(id);
    }

    /**
     * @param {number} page 
     * @param {number} size 
     * @returns 
     */
    async findAll(page, size) {
        const limit = size;
        const offset = page * limit;
        return this.costCenterModel.findAll({ limit, offset });
    }

    /**
     * @param {string} name 
     * @param {string} code 
     * @returns 
     */
    async create(name, code) {
        return this.costCenterModel.create({ name, code });
    }

    /**
     * @param {number} id 
     * @param {string} name 
     * @param {string} code 
     * @returns 
     */
    async update(id, name, code) {
        const costCenter = await this.findById(id);
        if (!costCenter) {
            throw new Error('Cost center not found');
        }
        costCenter.name = name;
        costCenter.code = code;
        return costCenter.save();
    }

    /**
     * @param {number} id 
     * @returns 
     */
    async delete(id) {
        const costCenter = await this.findById(id);
        if (!costCenter) {
            throw new Error('Cost center not found');
        }
        return costCenter.destroy();
    }

}