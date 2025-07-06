import mongoose from 'mongoose';
import { config } from './index';
import { Logger } from '../utils/logger';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI);
    Logger.info('🔗 MongoDB connected');
  } catch (error) {
    Logger.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
