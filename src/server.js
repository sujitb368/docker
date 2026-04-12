require('dotenv').config();
const app = require("./app");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;


// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the Express server and listen on the specified port or default to 8000
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    // Handle MongoDB connection errors
    console.log("MONGO db connection failed !!! ", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});