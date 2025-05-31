import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const URI = process.env.MONGODB_URL;
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI)
        // console.log("Connected to database successfully ", conn.connection.host);
    } catch (e) {
        console.log("Database connection failed", e);
    }
};