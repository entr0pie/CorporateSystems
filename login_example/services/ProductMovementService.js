import { Op } from 'sequelize';
import { DepositModel } from '../models/DepositModel.js';
import { ProductModel } from '../models/ProductModel.js';
import { ProductMovementModel } from '../models/ProductMovementModel.js';

export class ProductMovementService {
    /**
     * @param {ProductMovementModel} productMovementModel 
     */
    constructor(productMovementModel) {
        this.productMovementModel = productMovementModel;
    }

    /**
     * @param {number} depositId 
     * @param {number} productId 
     * @param {"IN" | "OUT"} movementType 
     * @param {number} quantity 
     * @param {number} unitaryPrice 
     * @param {Date} date 
     */
    async create(depositId, productId, movementType, quantity, unitaryPrice, date) {
        return await this.productMovementModel.create({
            depositId: depositId,
            productId: productId,
            movementType: movementType,
            quantity: quantity,
            unitaryPrice: unitaryPrice,
            date: date
        });
    }

    /**
    * @param {number} id 
    */
    async findById(id) {
        return await this.productMovementModel.findByPk(id);
    }

    /**
    * @param {number} page 
    * @param {number} size 
    */
    async findAll(page, size) {
        const offset = page * size;
        return await this.productMovementModel.findAll({ limit: size, offset: offset });
    }

    /** 
     * @param {number} productId 
     * @param {number} page 
     * @param {number} size 
     */
    async findByProductId(productId, page, size) {
        const offset = page * size;
        return await this.productMovementModel.findAll({ where: { productId: productId }, limit: size, offset: offset });
    }

    /**
     * @param {number} depositId 
     * @param {number} page 
     * @param {number} size 
     */
    async findByDepositId(depositId, page, size) {
        const offset = page * size;
        return await this.productMovementModel.findAll({ where: { depositId: depositId }, limit: size, offset: offset });
    }

    /**
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @param {number} page 
     * @param {number} size 
     */
    async findByDateInterval(startDate, endDate, page, size) {
        const offset = page * size;
        return await this.productMovementModel.findAndCountAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [DepositModel, ProductModel],
            offset: offset,
            limit: size
        });
    }

    /**
     * @param {number} productId
     * @returns { {depositId: number, quantity: number}[] } quantity
     */
    async countAvailableProducts(productId) {
        const outs = await this.productMovementModel.findAll({
            where: {
                productId: productId,
                movementType: "OUT"
            }
        });

        const ins = await this.productMovementModel.findAll({
            where: {
                productId: productId,
                movementType: "IN"
            }
        });

        const depositData = [];

        for (let i = 0; i < ins.length; i++) {
            const depositId = ins[i].depositId;
            const quantity = ins[i].quantity;

            if (depositData.find(d => d.depositId == depositId)) {
                depositData.find(d => d.depositId == depositId).quantity += quantity;
                continue;
            }

            depositData.push({ depositId: depositId, quantity: quantity });
        }


        for (let i = 0; i < outs.length; i++) {
            const depositId = outs[i].depositId;
            const quantity = outs[i].quantity;

            if (depositData.find(d => d.depositId == depositId)) {
                depositData.find(d => d.depositId == depositId).quantity -= quantity;
                continue;
            }

            depositData.push({ depositId: depositId, quantity: -quantity });
        }

        return depositData;
    }

    /**
     * @param {number} productId 
     * @returns 
     */
    async calcMediumPrice(productId) {
        const productMovements = await this.productMovementModel.findAll({
            where: {
                productId: productId
            }
        });

        let totalQuantity = 0;
        let totalValue = 0;

        for (let i = 0; i < productMovements.length; i++) {
            const productMovement = productMovements[i];
            totalQuantity += productMovement.quantity;
            totalValue += productMovement.quantity * productMovement.unitaryPrice;
        }

        return totalValue / totalQuantity;
    }
}