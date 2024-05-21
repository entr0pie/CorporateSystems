import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/DatabaseConfig.js';
import { ProductModel } from './ProductModel.js';
import { SuplierModel } from './SuplierModel.js';
import { CostCenterModel } from './CostCenterModel.js';

export const QuotationModel = sequelize.define('Quotation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    suplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    costCenterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

QuotationModel.belongsTo(ProductModel, { foreignKey: 'productId' });
QuotationModel.belongsTo(SuplierModel, { foreignKey: 'suplierId' });
QuotationModel.belongsTo(CostCenterModel, { foreignKey: 'costCenterId' });
