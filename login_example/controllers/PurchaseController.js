import { PurchaseService } from "../services/PurchaseService.js";

export class PurchaseController {

    /**
     * @param {PurchaseService} purchaseService 
     */
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }

    // async create(req, res) {
    //     try {
    //         const { suplierId, quotationId, productId, quantity, unitaryPrice, status } = req.body;
    //         const purchase = await this.purchaseService.create(suplierId, quotationId, productId, quantity, unitaryPrice, status);
    //         return res.status(201).json(purchase);
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message });
    //     }
    // }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const purchase = await this.purchaseService.findById(id);
            return res.status(200).json(purchase);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const purchases = await this.purchaseService.findAll(page, size);
            return res.status(200).json(purchases);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateStatus(req, res) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            await this.purchaseService.updateStatus(id, status);
            return res.status(200).send();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}