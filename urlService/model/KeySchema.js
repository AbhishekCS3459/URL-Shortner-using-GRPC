import { sequelize } from "../db/sequlize";

// Define Keys model schema
export const KeysSchema = sequelize.define("Keys", {
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