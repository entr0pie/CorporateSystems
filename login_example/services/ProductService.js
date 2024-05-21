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
    async findById(id) {
        return await this.productModel.findByPk(id);
    }

    /**
     * @param {string} name 
     * @param {string} description 
     * @param {boolean} isActive
     */
    async create(name, description, isActive) {
        return await this.productModel.create({
            name: name,
            description: description,
            isActive: isActive
        });
    }

    /**
     * @param {number} id
     * @param {string} name 
     * @param {string} description
     * @param {boolean} isActive
     */
    async update(id, name, description, isActive) {
        const product = await this.productModel.findByPk(id);

        if (!product) {
            throw new Error("Product not found");
        }

        product.set({
            name: name,
            description: description,
            isActive: isActive
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