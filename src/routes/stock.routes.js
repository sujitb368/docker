const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stock.controller");
const { getStockSchema } = require("../validations/stock.validation");
const validate = require('../middlewares/validate.middleware');
router.get("/", stockController.getAllStocks);
router.get("/:symbol", validate(getStockSchema, 'params'), stockController.getStockBySymbol);
router.put("/:symbol", validate(getStockSchema, 'params'), stockController.updateStock);
router.delete("/:symbol", validate(getStockSchema, 'params'), stockController.deleteStock);

module.exports = router;