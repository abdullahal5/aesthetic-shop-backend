import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import env from '../config/index.js';

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    logger.info('Using existing database connection');
    return;
  }

  try {
    const mongoUri = env.db.url;

    console.log(mongoUri);

    if (!mongoUri) {
      logger.error('MONGODB_URI is not defined in environment variables');
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoUri, opts);

    isConnected = true;

    logger.info('MongoDB Connected Successfully 🚀');

    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error', error);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected ⚠️');
      isConnected = false;
    });
  } catch (error) {
    logger.error('MongoDB connection failed', error as Error);
    throw error;
  }
};

// Helper function to check connection status
export const getConnectionStatus = () => isConnected;

// Helper function to close connection (useful for testing)
export const closeConnection = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    logger.info('MongoDB disconnected');
  }
};
