import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/DatabaseConfig.js';
import { QuotationModel } from './QuotationModel.js';
import { ProductModel } from './ProductModel.js';

export const PurchaseModel = sequelize.define('Purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    quotationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    unitaryPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("PENDING", "ENDED", "REJECTED"),
        allowNull: false,
    },
});

PurchaseModel.belongsTo(QuotationModel, { foreignKey: 'quotationId' });
PurchaseModel.belongsTo(ProductModel, { foreignKey: 'productId' });
