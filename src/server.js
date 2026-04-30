require('dotenv').config();
const app = require("./app");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;


// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the Express server and listen on the specified port or default to 8000
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    // Handle MongoDB connection errors
    console.log("MONGO db connection failed !!! ", err);
  });

/**
* 🧠 Graceful Shutdown Handler
*
* This ensures:
* - No new requests are accepted
* - Existing requests are completed
* - Resources (DB, Redis) are cleaned up
*/
const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed');

    try {
      // Close DB connection
      const mongoose = require('mongoose');
      await mongoose.connection.close();
      console.log('MongoDB connection closed');

      // Close Redis connection
      const redisClient = require('./config/redis');
      await redisClient.quit();
      console.log('Redis connection closed');

      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });

  // Force shutdown after timeout (safety)
  setTimeout(() => {
    console.error('Forcefully shutting down...');
    process.exit(1);
  }, 10000); // 10 seconds
};

/**
 * 🧠 Listen to system signals
 */
process.on('SIGINT', shutdown);   // Ctrl + C
process.on('SIGTERM', shutdown);  // Docker stop