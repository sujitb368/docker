const stockService = require("../services/stock.service");

exports.getAllStocks = async (req, res) => {
  const data = stockService.getAllStocks();
  res.json(data);
};

exports.getStockBySymbol = async (req, res) => {
  const { symbol } = req.params;

  const stock = await stockService.getStockBySymbol(symbol);

  if (!stock) {
    return res.status(404).json({ message: "Stock not found" });
  }

  res.json(stock);
};

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