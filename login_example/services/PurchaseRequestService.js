
import { ProductMovementService } from './ProductMovementService.js'
import { PurchaseRequestModel } from '../models/PurchaseRequestModel.js';
import { ProductService } from './ProductService.js';
import { UserService } from './UserService.js';
import { CostCenterService } from './CostCenterService.js';
import { UserAuthentication } from '../security/authentication/UserAuthentication.js';

export class PurchaseRequestService {

    /**
     * @param {ProductMovementService} productMovementService 
     * @param {ProductService} productService
     * @param {UserService} userService
     * @param {CostCenterService} costCenterService
     * @param {PurchaseRequestModel} purchaseRequestModel 
     */
    constructor(productMovementService, productService, userService, costCenterService, purchaseRequestModel) {
        this.productMovementService = productMovementService;
        this.productService = productService;
        this.userService = userService;
        this.costCenterService = costCenterService;
        this.purchaseRequestModel = purchaseRequestModel;
    }

    /**
     * @param {number} productId 
     * @param {number} quantity 
     * @param {UserAuthentication} userAuthentication 
     * @param {number} costCenterId 
     * @returns 
     */
    async create(productId, quantity, userAuthentication, costCenterId) {

        const product = await this.productService.findById(productId);
        const user = await this.userService.findByEmail(userAuthentication.getSubject());
        const costCenter = await this.costCenterService.findById(costCenterId);

        if (!product || !user || !costCenter) {
            throw new Error("Product, User or Cost Center not found");
        }

        let status = "PENDING";

        const depositData = (await this.productMovementService.countAvailableProducts(productId)).filter(e => e.quantity > 0);

        let availableQuantity = 0;
        for (let deposit of depositData) {
            availableQuantity += deposit.quantity;
        }

        if (availableQuantity >= quantity) {
            status = "APPROVED";

            let remainingQuantity = quantity;

            const mediumPrice = await this.productMovementService.calcMediumPrice(productId);

            for (let i = 0; i < depositData.length; i++) {
                const deposit = depositData[i];
                if (deposit.quantity >= remainingQuantity) {
                    await this.productMovementService.create(deposit.depositId, productId, "OUT", remainingQuantity, mediumPrice, new Date());
                    break;
                }

                await this.productMovementService.create(deposit.depositId, productId, "OUT", deposit.quantity, mediumPrice, new Date());
                remainingQuantity -= deposit.quantity;
            }
        }

        const purchaseRequest = await this.purchaseRequestModel.create({
            productId: productId,
            quantity: quantity,
            userId: user.id,
            costCenterId: costCenter.id,
            status: status
        });

        return purchaseRequest;
    }

    /**
     * @param {number} id 
     */
    async findById(id) {
        const purchaseRequest = await this.purchaseRequestModel.findByPk(id);
        if (!purchaseRequest) {
            throw new Error("Purchase Request not found");
        }
        return purchaseRequest;
    }

    /**
     * @param {number} page 
     * @param {number} size 
     */
    async findAll(page, size) {
        return await this.purchaseRequestModel.findAll({
            offset: page * size,
            limit: size
        });
    }

    /**
     * @param {number} id 
     */
    async cancel(id) {
        const purchaseRequest = await this.findById(id);
        if (purchaseRequest.status === "REJECTED") {
            throw new Error("Purchase Request already canceled");
        }
        if (purchaseRequest.status === "APPROVED") {
            throw new Error("Purchase Request already approved");
        }

        purchaseRequest.status = "CANCELED";
        await purchaseRequest.save();
    }
}