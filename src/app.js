const express = require("express");
const errorMiddleware = require('./middlewares/error.middleware');

// after all routes
const app = express();

app.use(express.json());
app.use(errorMiddleware);

// routes will come here later

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
//   res.json({ status: "fail" });
});

// stock routes
const stockRoutes = require("./routes/stock.routes");
app.use("/api/stocks", stockRoutes);

module.exports = app;