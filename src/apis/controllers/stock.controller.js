const stockService = require("../services/stock.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
exports.getAllStocks = async (req, res) => {
  const data = stockService.getAllStocks();
  res.json(data);
};

exports.getStockBySymbol = asyncHandler(async (req, res) => {
  const { symbol } = req.params;

  const stock = await stockService.getStockBySymbol(symbol);

  if (!stock) {
    throw new AppError('Stock not found', 404);
  }

  res.json({
    success: true,
    instance: process.env.HOSTNAME,
    data: stock
  });
});

exports.updateStock = async (req, res) => {
  const { symbol } = req.params;
  const { price } = req.body;

  const updated = await stockService.updateStock(symbol, price);

  if (!updated) {
    return res.status(404).json({ message: "Stock not found" });
  }

  res.json(updated);
};

exports.deleteStock = async (req, res) => {
  const { symbol } = req.params;

  const deleted = await stockService.deleteStock(symbol);

  if (!deleted) {
    return res.status(404).json({ message: "Stock not found" });
  }

  res.json({ message: "Deleted successfully" });
};