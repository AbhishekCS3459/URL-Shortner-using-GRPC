import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize instance
export const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 14613,
  logging: console.log, // Logs SQL queries to the console
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      ca:process.env.DB_CA_PEM,
    },
  },
});

