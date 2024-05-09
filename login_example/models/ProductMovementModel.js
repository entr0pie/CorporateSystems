import { sequelize } from '../config/database/DatabaseConfig.js';
import { DataTypes } from 'sequelize';
import { DepositModel } from './DepositModel.js';
import { ProductModel } from './ProductModel.js';

export const ProductMovementModel = sequelize.define("ProductMovement", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    depositId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DepositModel,
            key: 'id'
        }
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id'
        }
    },

    movementType: {
        type: DataTypes.ENUM("IN", "OUT"),
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },

    unitaryPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

ProductMovementModel.belongsTo(DepositModel, { foreignKey: 'depositId' });
ProductMovementModel.belongsTo(ProductModel, { foreignKey: 'productId' });
