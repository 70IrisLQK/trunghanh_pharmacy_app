import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;

const database = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  port: DB_PORT,
  host: DB_HOST,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

export default database;
