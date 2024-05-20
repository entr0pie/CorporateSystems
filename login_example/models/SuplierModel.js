import { sequelize } from '../config/database/DatabaseConfig.js';
import { DataTypes } from 'sequelize';

export const SuplierModel = sequelize.define('Suplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    /**
     * Company Identification Number
     */
    cin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});
