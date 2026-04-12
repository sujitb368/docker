
const mongoose = require("mongoose");
const MONGODB_URI =  process.env.MONGO_URI
const connectDB = async () => {
    try {
        // Attempt to establish a connection to the MongoDB database
        const connectionInstance = await mongoose.connect(MONGODB_URI);

        // Log a success message with the connected host information
        console.log("MongoDB connected");
        console.log(
            `\n ✅ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        // Log an error message if the MongoDB connection fails and exit the process with an error code
        console.log("❌ MONGODB connection FAILED ", error);
        process.exit(1);
    }
};
module.exports = connectDB;