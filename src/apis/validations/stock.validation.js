const Joi = require('joi');

exports.getStockSchema = Joi.object({
    symbol: Joi.string().alphanum().min(1).max(20).required()
});