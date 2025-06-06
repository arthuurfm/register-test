import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export default connectDB;