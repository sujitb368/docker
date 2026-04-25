const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    max: 10,
    window: 5 * 60 * 1000,
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
})

module.exports = limiter;