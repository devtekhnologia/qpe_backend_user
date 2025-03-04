import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MongoDB connection string (MONGO_URI) is missing.");
  process.exit(1);
}

// ✅ Database connection function
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
