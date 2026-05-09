const stockService = require("../src/services/stock.service");
const redis = require("../src/config/redis");

beforeEach(async () => {
  stockService.resetStocks();
  await redis.flushall(); // 🔥 important
});

// 🔥 IMPORTANT: close connection after all tests
afterAll(async () => {
  // await redis.quit();
});