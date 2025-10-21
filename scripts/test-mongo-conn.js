// Quick MongoDB connection tester
// Usage: set MONGO_URL in your environment or create a .env file in the repo root with MONGO_URL="your-connection-string"

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url =
  process.env.MONGO_URL || process.env.MONGODB_URL || process.env.MONGO_URI;

async function run() {
  if (!url) {
    console.error(
      "ERROR: No MongoDB connection string found. Set MONGO_URL in your environment or .env file."
    );
    console.error(
      'Example .env entry: MONGO_URL="mongodb+srv://user:pass@cluster0.example.mongodb.net/mydb?retryWrites=true&w=majority"'
    );
    process.exit(2);
  }

  console.log("Attempting to connect to MongoDB...");
  try {
    // Use a short timeout so failures surface quickly
    const conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(
      "MongoDB connection successful. Host(s):",
      conn.connection.host
    );
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("MongoDB connection failed:");
    console.error(err);
    process.exit(1);
  }
}

run();
