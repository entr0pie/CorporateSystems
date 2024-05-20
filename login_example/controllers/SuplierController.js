import { SuplierService } from "../services/SuplierService.js";

export class SuplierController {

    /**
     * @param {SuplierService} suplierService 
     */
    constructor(suplierService) {
        this.suplierService = suplierService;
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const suplier = await this.suplierService.findById(id);

            if (!suplier) {
                return res.status(404).json({ message: 'Suplier not found' });
            }

            return res.json(suplier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const supliers = await this.suplierService.findAll(page, size);
            return res.json(supliers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { name, address, phone, cin } = req.body;
            const suplier = await this.suplierService.create(name, address, phone, cin);
            return res.json(suplier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { name, address, phone, cin } = req.body;
            const suplier = await this.suplierService.update(id, name, address, phone, cin);
            return res.json(suplier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await this.suplierService.delete(id);
            return res.json({ message: 'Suplier deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}