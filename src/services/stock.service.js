const redis = require("../config/redis");

let stocks = [];

const initialData = [
    { symbol: "AAPL", price: 150 },
    { symbol: "TSLA", price: 700 },
];

exports.resetStocks = () => {
    stocks = JSON.parse(JSON.stringify(initialData));
};

exports.resetStocks();

// 🔹 GET ALL
exports.getAllStocks = () => stocks;

// 🔹 GET BY SYMBOL (WITH CACHE)
exports.getStockBySymbol = async (symbol) => {
    console.log("👉 Service hit for:", symbol);
    const key = `stock:${symbol.toUpperCase()}`;

    // 1. Check cache
    const cached = await redis.get(key);

    if (cached) {
        console.log("⚡ Cache HIT");
        return JSON.parse(cached);
    }

    console.log("🐢 Cache MISS");

    // 2. Fetch from "DB"
    const stock = stocks.find(
        (s) => s.symbol === symbol.toUpperCase()
    );

    if (!stock) return null;

    // 3. Store in Redis (TTL = 60 sec)
    await redis.set(key, JSON.stringify(stock), "EX", 60);

    return stock;
};

// 🔹 UPDATE
exports.updateStock = async (symbol, price) => {
    const key = `stock:${symbol.toUpperCase()}`;

    const stock = stocks.find(
        (s) => s.symbol === symbol.toUpperCase()
    );

    if (!stock) return null;

    stock.price = price;

    // ❗ Invalidate cache
    await redis.del(key);

    return stock;
};

// 🔹 DELETE
exports.deleteStock = async (symbol) => {
    const key = `stock:${symbol.toUpperCase()}`;

    const index = stocks.findIndex(
        (s) => s.symbol === symbol.toUpperCase()
    );

    if (index === -1) return null;

    const deleted = stocks.splice(index, 1);

    // ❗ Invalidate cache
    await redis.del(key);

    return deleted;
};