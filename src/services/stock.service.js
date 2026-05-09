// const redis = require("../config/redis");
const Stock = require("../models/stock.model");

// 🔹 GET ALL
exports.getAllStocks = async () => {
    return await Stock.find();
};

// 🔹 GET BY SYMBOL (WITH CACHE)
exports.getStockBySymbol = async (symbol) => {
    console.log("👉 Service hit for:", symbol);

    const key = `stock:${symbol.toUpperCase()}`;

    // const cached = await redis.get(key);

    if (cached) {
        console.log("⚡ Cache HIT");
        return JSON.parse(cached);
    }

    console.log("🐢 Cache MISS");

    const stock = await Stock.findOne({
        symbol: symbol.toUpperCase(),
    });

    if (!stock) return null;

    // await redis.set(key, JSON.stringify(stock), "EX", 60);

    return stock;
};

// 🔹 UPDATE
exports.updateStock = async (symbol, price) => {
    const key = `stock:${symbol.toUpperCase()}`;

    const stock = await Stock.findOneAndUpdate(
        { symbol: symbol.toUpperCase() },
        { price },
        { new: true }
    );

    if (!stock) return null;

    // await redis.del(key);

    return stock;
};

// 🔹 DELETE
exports.deleteStock = async (symbol) => {
    const key = `stock:${symbol.toUpperCase()}`;

    const stock = await Stock.findOneAndDelete({
        symbol: symbol.toUpperCase(),
    });

    if (!stock) return null;

    // await redis.del(key);

    return stock;
};