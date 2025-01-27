require("dotenv").config({ path: "../.env" });
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL || "rediss://default:4599";
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/url-shortener";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

module.exports = {
  BASE_URL,
  PORT,
  REDIS_URL,
  DB_URI,
  FRONTEND_URL,
};
