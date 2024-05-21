import { PurchaseRequestService } from "../services/PurchaseRequestService.js";

export class PurchaseRequestController {

    /**
     * @param {PurchaseRequestService} purchaseRequestService 
     */
    constructor(purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }

    async create(req, res) {
        try {
            const { productId, quantity, costCenterId } = req.body;
            const auth = req.auth;
            const purchaseRequest = await this.purchaseRequestService.create(productId, quantity, auth, costCenterId);
            return res.status(201).json(purchaseRequest);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const purchaseRequest = await this.purchaseRequestService.findById(id);
            return res.status(200).json(purchaseRequest);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const purchaseRequests = await this.purchaseRequestService.findAll(page, size);
            return res.status(200).json(purchaseRequests);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async cancel(req, res) {
        try {
            const id = req.params.id;
            await this.purchaseRequestService.cancel(id);
            return res.status(200).send();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}