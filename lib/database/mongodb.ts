import Logger from "@/utils/logger";
import mongoose from "mongoose";

let isConnected = false;

const connectMongoDB = async () => {
  try {
    if (isConnected) return;

    if (!process.env.MONGODB_URI) {
      Logger.error("MongoDB URI is not defined in the environment variables.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    Logger.info("DATABASE CONNECTED");
  } catch (error) {
    Logger.error("DATABASE CONNECTION ERROR: ", error);
  }
};

export default connectMongoDB;