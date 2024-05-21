import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/DatabaseConfig.js';
import { UserModel } from './UserModel.js';
import { ProductModel } from './ProductModel.js';
import { CostCenterModel } from './CostCenterModel.js';

export const PurchaseRequestModel = sequelize.define('PurchaseRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    costCenterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        allowNull: false,
    },

});

PurchaseRequestModel.belongsTo(UserModel, { foreignKey: 'userId' });
PurchaseRequestModel.belongsTo(ProductModel, { foreignKey: 'productId' });
PurchaseRequestModel.belongsTo(CostCenterModel, { foreignKey: 'costCenterId' });