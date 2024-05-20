import { SuplierModel } from "../models/SuplierModel.js";

export class SuplierService {

    /**
     * @param {SuplierModel} suplierModel 
     */
    constructor(suplierModel) {
        this.suplierModel = suplierModel;
    }

    /**
     * @param {number} id 
     * @returns 
     */
    async findById(id) {
        return await this.suplierModel.findByPk(id);
    }

    /**
     * @param {number} page 
     * @param {number} size 
     * @returns 
     */
    async findAll(page, size) {
        return await this.suplierModel.findAll({
            offset: page * size,
            limit: size
        });
    }

    /**
     * @param {string} name 
     * @param {string} address 
     * @param {string} phone 
     * @param {string} cin 
     */
    async create(name, address, phone, cin) {
        return await this.suplierModel.create({
            name: name,
            address: address,
            phone: phone,
            cin: cin
        });
    }

    /**
     * @param {number} id 
     * @param {string} name 
     * @param {string} address 
     * @param {string} phone 
     * @param {string} cin 
     */
    async update(id, name, address, phone, cin) {
        const suplier = await this.suplierModel.findByPk(id);
        if (!suplier) {
            throw new Error('Suplier not found');
        }

        suplier.name = name;
        suplier.address = address;
        suplier.phone = phone;
        suplier.cin = cin;

        return await suplier.save();
    }

    /**
     * @param {number} id 
     */
    async delete(id) {
        const suplier = await this.suplierModel.findByPk(id);
        if (!suplier) {
            throw new Error('Suplier not found');
        }

        await suplier.destroy();
        return true;
    }
}