import { Sequelize } from 'sequelize';

const config = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  options: {
    host: process.env.DATABASE_HOST,
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
