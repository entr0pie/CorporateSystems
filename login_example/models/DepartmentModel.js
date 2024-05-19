import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/DatabaseConfig.js';
import { UserModel } from './UserModel.js';

export const DepartmentModel = sequelize.define('Department', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        unique: true,
    },
});

UserModel.belongsTo(DepartmentModel);
DepartmentModel.hasMany(UserModel);