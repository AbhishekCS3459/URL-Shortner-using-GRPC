const URLSchema = require("../models/URLSchema");
const { URLclient } = require("../grpc/grpcClient.js");
const Redis = require("ioredis");
const RedisCache = require("../service/Redis.js");
const { BASE_URL } = require("../config.js");

exports.shortenURL = async (req, res) => {
  const { longUrl, userId, metadata } = req.body;

  try {
    URLclient.createKeys({}, async (error, response) => {
      if (error) {
        console.error("Error in createKeys:", error);
        return res.status(500).json({ error: "Failed to generate unique key" });
      }
      const shortUrlId = response.key;
      

      const newURL = new URLSchema({
        shortUrlId,
        longUrl,
        userId,
        metadata,
        isActive: true,
      });
      
      await newURL.save();

      res.status(201).json({
        message: "Short URL created successfully",
        shortUrlId,
        longUrl,
        shortUrl: `${BASE_URL}/${shortUrlId}`,
      });
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.redirectURL = async (req, res) => {

  const { shortUrl } = req.params;

  try {
  
    const redisCache = new RedisCache();

    // Check the Redis cache first
    let redirectUrl = await redisCache.getFromCache(shortUrl);
    if (!redirectUrl) {
      console.log("Short URL not found in cache. Querying the database.");

      // Query the database using shortUrlId
      const urlRecord = await URLSchema.findOne({
        shortUrlId: shortUrl,
        isActive: true,
      });

      if (!urlRecord) {
        return res.status(404).json({ error: "Short URL not found or inactive" });
      }

      // Update Redis and LRU cache
      redirectUrl = urlRecord.longUrl;
      await redisCache.cacheUrl(shortUrl, redirectUrl);

      // Increment clicks and save the updated record
      urlRecord.clicks += 1;
      await urlRecord.save();
    } else {
      console.log(`Redirect URL found in cache: ${redirectUrl}`);
    }

    // Ensure the URL starts with http:// or https://
    if (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) {
      redirectUrl = `http://${redirectUrl}`;
    }

    console.log("Redirecting to long URL:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error redirecting to long URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
