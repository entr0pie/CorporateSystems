import { PurchaseModel } from "../models/PurchaseModel.js";
import { DepositService } from "./DepositService.js";
import { ProductMovementService } from "./ProductMovementService.js";

export class PurchaseService {

    /**
     * @param {ProductMovementService} productMovement
     * @param {DepositService} depositService
     * @param {PurchaseModel} purchaseModel 
     */
    constructor(productMovement, depositService, purchaseModel) {
        this.productMovement = productMovement;
        this.depositService = depositService;
        this.purchaseModel = purchaseModel;
    }

    async create(quotationId, productId, quantity, unitaryPrice, status) {
        return await this.purchaseModel.create({ quotationId, productId, quantity, unitaryPrice, status });
    }

    async findById(id) {
        return await this.purchaseModel.findByPk(id);
    }

    async findAll(page, size) {
        return await this.purchaseModel.findAll({
            offset: page * size,
            limit: size
        });
    }

    async updateStatus(id, status) {
        const purchase = await this.purchaseModel.findByPk(id);
        if (!purchase) {
            throw new Error("Purchase not found");
        }

        if (status == "ENDED") {
            const firstDepositAvailable = (await this.depositService.findAll(0, 1)).at(0);

            if (!firstDepositAvailable) {
                throw new Error("There is no deposit available");
            };

            await this.productMovement.create(1, purchase.productId, "IN", purchase.quantity, purchase.unitaryPrice, new Date());
        }

        purchase.status = status;
        await purchase.save();
    }


}