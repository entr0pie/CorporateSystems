import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/DatabaseConfig.js';

export const CostCenterModel = sequelize.define('CostCenter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    code: {
        type: DataTypes.STRING,
        unique: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});