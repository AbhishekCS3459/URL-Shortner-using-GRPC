import { sequelize } from "../db/sequlize.js";
import { generateKeys } from "./generateKeys.js";
import { Sequelize, DataTypes } from "sequelize";


// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Define Keys model schema
const KeysSchema = sequelize.define("Keys", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure unique keys at the database level
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the database and bulk create keys
sequelize
  .sync({ alter: true }) // Use 'alter: true' for safer migrations in development
  .then(async () => {
    console.log("Database synchronized successfully.");

    try {
      const keys = generateKeys(7); // Generate keys with a length of 4

      // Prepare data for bulk creation
      const keyObjects = keys.map((key) => ({ key }));

      // Bulk insert keys and handle duplicates
      await KeysSchema.bulkCreate(keyObjects, { ignoreDuplicates: false });

      console.log("Keys inserted successfully!");
    } catch (error) {
      console.error("Error inserting keys into the table:", error);
    }
  })
  .catch((error) => {
    console.error("Unable to sync database or create table:", error);
  });
