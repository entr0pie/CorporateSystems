import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/DatabaseConfig.js';

export const DepositModel = sequelize.define('Deposit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        unique: true,
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
});