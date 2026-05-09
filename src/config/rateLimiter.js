const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    max: 10,
    // window: 5 * 60 * 1000, // not worked in my machine
    windowMs: 5 * 60 * 1000, // working in my machine
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
})

module.exports = limiter;