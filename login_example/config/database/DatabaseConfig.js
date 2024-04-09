import { env } from '../env/EnvConfiguration.js';
import { Sequelize } from 'sequelize';

const config = {
  database: env.DATABASE_NAME,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  options: {
    host: env.DATABASE_HOST,
    dialect: 'mysql'
  }
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
);

sequelize.authenticate().catch((reason) => {
  console.log("Could not authenticate into the database:", reason);
});
