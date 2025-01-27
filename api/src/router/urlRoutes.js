const express = require("express");
const { shortenURL, redirectURL } = require("../controllers/urlController");
const router = express.Router();

// URL Shortener routes
router.post("/url/shorten", shortenURL);
router.get("/:shortUrl", redirectURL);

module.exports = router;
