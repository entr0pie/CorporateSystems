import { DepartmentModel } from "../models/DepartmentModel.js";

export class DepartmentService {

    /**
     * @param {DepartmentModel} departmentModel 
     */
    constructor(departmentModel) {
        this.departmentModel = departmentModel;
    }

    /**
     * @param {number} id 
     */
    async findById(id) {
        return await this.departmentModel.findByPk(id);
    }

    /**
     * @param {number} page 
     * @param {number} size 
     */
    async findAll(page, size) {
        const offset = page * size;
        return await this.departmentModel.findAll({ limit: size, offset: offset });
    }

    /**
     * @param {string} name 
     */
    async create(name) {
        return await this.departmentModel.create({ name });
    }

    /**
     * @param {number} id 
     * @param {string} name 
     */
    async update(id, name) {
        const department = await this.departmentModel.findByPk(id);
        department.name = name;
        return await department.save();
    }

    /**
     * @param {number} id 
     */
    async delete(id) {
        return await this.departmentModel.destroy({ where: { id } });
    }

}