import { ProductModel } from "../models/ProductModel.js";

export class ProductService {

    /**
     * @param {ProductModel} productModel 
     */
    constructor(productModel) {
        this.productModel = productModel;
    }

    /**
     * @param {number} id 
     */
    async getById(id) {
        return await this.productModel.findByPk(id); 
    }

    /**
     * @param {string} name 
     * @param {string} description 
     */
    async create(name, description) {
        return await this.productModel.create({
            name: name,
            description: description,
        });
    }
    
    /**
     * @param {number} id
     * @param {string} name 
     * @param {string} description 
     */
    async update(id, name, description) {
        const product = await this.productModel.findByPk(id);
        
        if (!product) {
            throw new Error("Product not found");
        }

        product.set({
            name: name,
            description: description
        });

        return await product.save();
    }

    /**
     * @param {number} id 
     */
    async delete(id) {
        const product = await this.productModel.findByPk(id);
        
        if (!product) {
            throw new Error("Product not found");
        }

        return await product.destroy();
    }
}