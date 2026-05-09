const redis = require('../config/redis');

/**
 * 🧠 Prevent cache stampede
 */
async function acquireLock(key, ttl = 5) {
    const lockKey = `lock:${key}`;

    const result = await redis.set(lockKey, '1', 'NX', 'EX', ttl);

    return result === 'OK';
}

async function releaseLock(key) {
    const lockKey = `lock:${key}`;
    await redis.del(lockKey);
}

// module.exports = { acquireLock, releaseLock };

// cache lock is a technique to prevent cache stampede by allowing only one request to fetch data from the source and update the cache while other requests wait for the cache to be updated. This is implemented using Redis locks in this code.

// sample code to used in service layer:

// const { acquireLock, releaseLock } = require('../utils/cacheLock');

// const cacheKey = `stock:${symbol}`;

// let cached = await redis.get(cacheKey);

// if (cached) {
//   return JSON.parse(cached);
// }

// // try to acquire lock
// const hasLock = await acquireLock(cacheKey);

// if (hasLock) {
//   try {
//     const stock = await retry(() =>
//       StockModel.findOne({ symbol })
//     );

//     await redis.set(cacheKey, JSON.stringify(stock), 'EX', 60);

//     return stock;
//   } finally {
//     await releaseLock(cacheKey);
//   }
// } else {
//   // wait and retry cache
//   await new Promise(res => setTimeout(res, 100));

//   const retryCache = await redis.get(cacheKey);
//   if (retryCache) return JSON.parse(retryCache);

//   throw new Error('Temporary overload, try again');
// }