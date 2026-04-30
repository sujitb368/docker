const express = require("express");
const errorMiddleware = require('./middlewares/error.middleware');
const helmet = require('helmet');
const morgan = require('morgan');
const { client } = require('./config/metrics');
const metricsMiddleware = require('./middlewares/metrics.middleware');

const app = express();


app.use(helmet());

app.use(express.json());


// route | request logs
app.use(morgan('dev'));

app.use(metricsMiddleware);
// metrics route
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
  //   res.json({ status: "fail" });
});


// rate limiter
app.use('/api', require('./config/rateLimiter'));


// stock routes
app.use("/api/stocks", require("./routes/stock.routes"));


// global middleware
app.use(errorMiddleware); // golbal error handler middleware

module.exports = app;