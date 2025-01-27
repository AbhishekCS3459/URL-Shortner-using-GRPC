const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { shortenURL, redirectURL } = require("./controllers/urlController");
const RedisCache = require("./service/Redis");
const cors = require("cors");
const { FRONTEND_URL, PORT, DB_URI } = require("./config");
require("dotenv").config({ path: "../.env" });

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS FOR FRONTEND RUNNING ON 3000
app.use(
  cors({
    origin: FRONTEND_URL ||"http://localhost:3000",
  })
);

// Connect to MongoDB
const connectToDB = async () => {

  try {
    await mongoose.connect(DB_URI, { autoIndex: true });
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB");
  }
};
connectToDB();
const cache = new RedisCache();

// Register Routes
app.get("/", (req, res) => {
  res.send("URL Shortener API");
});

app.use("/api/url/shorten", shortenURL);
app.get("/:shortUrl", redirectURL);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
