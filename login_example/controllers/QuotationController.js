import { QuotationService } from "../services/QuotationService.js";

export class QuotationController {

    /**
     * @param {QuotationService} quotationService 
     */
    constructor(quotationService) {
        this.quotationService = quotationService;
    }

    async create(req, res) {
        try {
            const { productId, suplierId, price, date, costCenterId, expirationDate } = req.body;
            const quotation = await this.quotationService.create(productId, suplierId, price, date, costCenterId, expirationDate);
            res.status(201).json(quotation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const quotation = await this.quotationService.findById(id);

            if (!quotation) {
                return res.sendStatus(404);
            }

            return res.json(quotation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const { page, size } = req.query;
            const quotations = await this.quotationService.findAll(parseInt(page), parseInt(size));
            res.json(quotations);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { productId, suplierId, price, date, costCenterId, expirationDate } = req.body;
            const quotation = await this.quotationService.update(parseInt(id), productId, suplierId, price, date, costCenterId, expirationDate);
            res.json(quotation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await this.quotationService.delete(id);
            res.sendStatus(204);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}