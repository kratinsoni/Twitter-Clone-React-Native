import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
    const conn = await mongoose.connect(ENV.MONGO_URI);

    console.log("Database connected successfully ✅", conn.connection.host);

    return conn;
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1)
    }
}