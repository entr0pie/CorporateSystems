import { Sequelize } from 'sequelize';

const config = {
  database: 'LOGIN_EXAMPLE',
  username: 'root',
  password: 'secret',
  options: {
    host: 'localhost',
    dialect: 'mysql'
  }
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
);