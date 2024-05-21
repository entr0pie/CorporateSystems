import { Op } from "sequelize";
import { QuotationModel } from "../models/QuotationModel.js";

export class QuotationService {

    /**
     * @param {QuotationModel} quotationModel 
     */
    constructor(quotationModel) {
        this.quotationModel = quotationModel;
    }

    /**
     * @param {number} productId 
     * @param {number} suplierId 
     * @param {number} price 
     * @param {Date} date 
     * @param {number} costCenterId 
     * @param {Date} expirationDate 
     */
    async create(productId, suplierId, price, date, costCenterId, expirationDate) {
        return await this.quotationModel.create({
            productId,
            suplierId,
            price,
            date,
            costCenterId,
            expirationDate,
        });
    }

    async findQuotationsByProductId(productId) {
        return await this.quotationModel.findAll({
            where: {
                productId,
                expirationDate: {
                    [Op.gt]: new Date()
                }
            }
        });
    }

    /**
     * @param {number} id 
     * @returns 
     */
    async findById(id) {
        return await this.quotationModel.findByPk(id);
    }

    /**
     * @param {number} page 
     * @param {number} size 
     * @returns 
     */
    async findAll(page, size) {
        return await this.quotationModel.findAll({
            offset: page * size,
            limit: size,
        });
    }

    /**
     * @param {number} id 
     * @param {number} productId 
     * @param {number} suplierId 
     * @param {number} price 
     * @param {Date} date 
     * @param {number} costCenterId 
     * @param {Date} expirationDate 
     * @returns 
     */
    async update(id, productId, suplierId, price, date, costCenterId, expirationDate) {
        const quotation = await this.findById(id);

        if (!quotation) {
            throw new Error('Quotation not found');
        }

        return await quotation.update({
            productId,
            suplierId,
            price,
            date,
            costCenterId,
            expirationDate,
        });
    }

    /**
     * @param {number} id 
     * @returns 
     */
    async delete(id) {
        const quotation = await this.findById(id);

        if (!quotation) {
            throw new Error('Quotation not found');
        }

        return await quotation.destroy();
    }

}