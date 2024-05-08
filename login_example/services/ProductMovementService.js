import { ProductMovementModel } from "../models/ProductMovementModel";

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
     * @param {number} productId 
     * @param {number} page 
     * @param {number} size 
     */
    async findByProductId(productId, page, size) {
        const offset = page * size;
        return await this.productMovementModel.findAll({where: { productId: productId }, limit: size, offset: offset});
    }

    /**
     * @param {number} depositId 
     * @param {number} page 
     * @param {number} size 
     */
    async findByDepositId(depositId, page, size) {
        const offset = page * size;
        return await this.productMovementModel.findAll({where: { depositId: depositId }, limit: size, offset: offset});
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
}