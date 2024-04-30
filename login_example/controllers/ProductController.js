import { ProductService } from "../services/ProductService.js";

export class ProductController {

    /**
     * @param {ProductService} productService 
     */
    constructor(productService) {
        this.productService = productService;
    }

    async findById(req, res) {
        const id = parseInt(req.params.id);
        
        const product = await this.productService.getById(id);
        
        if (!product) {
            return res.status(404).send();
        }

        return res.json(product);
    }

    async create(req, res) {
        const { name, description } = req.body;

        try {
            const product = await this.productService.create(name, description);
            return res.json(product);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req, res) {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;

        try {
            const product = await this.productService.update(id, name, description);
            return res.json(product);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req, res) {
        const id = parseInt(req.params.id);

        try {
            await this.productService.delete(id);
            return res.status(200).send();
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}