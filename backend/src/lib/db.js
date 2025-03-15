import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (e) {
    console.log(`MongoDB Connection Error ${e}`);
    console.error;
  }
};
