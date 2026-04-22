const express = require("express");
const errorMiddleware = require('./middlewares/error.middleware');

// after all routes
const app = express();

app.use(express.json());

// routes will come here later

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
//   res.json({ status: "fail" });
});

// stock routes
app.use("/api/stocks", require("./routes/stock.routes"));

app.use(errorMiddleware); // golbal error handler middleware
module.exports = app;