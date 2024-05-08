import { sequelize } from '../config/database/DatabaseConfig.js';
import { DataTypes } from 'sequelize';

export const ProductModel = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        unique: true,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
});