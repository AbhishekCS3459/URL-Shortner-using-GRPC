const Redis = require("ioredis");
const { REDIS_URL } = require("../config");

class RedisCache {
  static instance;

  constructor() {
    if (!RedisCache.instance) {
      this.redisClient = new Redis(REDIS_URL);
      this.redisClient.on("connect", () => {
        
        console.log("Connected to Redis");
      });
      this.redisClient.on("error", (error) => {
        console.error("Error connecting to Redis:", REDIS_URL);
        console.error("Error connecting to Redis:", error);
      });

      // Initialize an LRU Cache in memory
      this.lruCache = new Map();
      this.cacheLimit = 100; // Adjust the LRU cache size as needed

      RedisCache.instance = this;
    }
    return RedisCache.instance;
  }

  // LRU Caching Policy: Get from cache
  getFromCache(key) {
    if (this.lruCache.has(key)) {
      // Move the accessed item to the end (most recently used)
      const value = this.lruCache.get(key);
      this.lruCache.delete(key);
      this.lruCache.set(key, value);
      return value;
    }
    return null;
  }

  // LRU Caching Policy: Set to cache
  setToCache(key, value) {
    if (this.lruCache.size >= this.cacheLimit) {
      // Remove the least recently used item
      const leastRecentlyUsedKey = this.lruCache.keys().next().value;
      this.lruCache.delete(leastRecentlyUsedKey);
    }
    this.lruCache.set(key, value);
  }

  // Cache URL in Redis with LRU logic
  async cacheUrl(key, value, ttl = 3600) {
    // Check if the value exists in the LRU cache
    if (this.getFromCache(key)) {
      console.log(`URL found in LRU Cache: ${key}`);
      return this.getFromCache(key);
    }

    // Check Redis
    const cachedValue = await this.redisClient.get(key);
    if (cachedValue) {
      console.log(`URL found in Redis: ${key}`);
      this.setToCache(key, cachedValue); // Update LRU cache
      return cachedValue;
    }

    // Cache in Redis if not present
    console.log(`Caching URL: ${key}`);
    await this.redisClient.set(key, value, "EX", ttl);
    this.setToCache(key, value); // Update LRU cache
    return value;
  }

  // Get Redis client for other operations if needed
  getRedisClient() {
    return this.redisClient;
  }
}

module.exports = RedisCache;
