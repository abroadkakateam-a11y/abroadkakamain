import mongoose from 'mongoose';
import { config } from './index';
import { Logger } from '../utils/logger';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("✅ MongoDB Connected");
    Logger.info('🔗 MongoDB connected');
  } catch (error) {
    Logger.error('❌ MongoDB connection error:', error);
    console.error("❌ MongoDB Error:", error);

    process.exit(1);
  }
}
