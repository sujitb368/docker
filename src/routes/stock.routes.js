const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stock.controller");

router.get("/", stockController.getAllStocks);
router.get("/:symbol", stockController.getStockBySymbol);
router.put("/:symbol", stockController.updateStock);
router.delete("/:symbol", stockController.deleteStock);

module.exports = router;