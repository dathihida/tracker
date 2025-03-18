import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if(!DB_URL) {
  throw new 
  Error('Please define the MONGODB_URL environment variable inside .env.<development/production>.local');
}

const connectDatabase = async() => {
    try {
        await mongoose.connect(DB_URL);

        console.log(`MongoDB connected: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to database', error.message);
        process.exit(1);
    }
}

export default connectDatabase;