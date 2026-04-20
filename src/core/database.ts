import mongoose from 'mongoose';
import env from '../config/index.js';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// 👇 Safe global typing
const globalWithMongoose = globalThis as unknown as {
  mongoose: MongooseCache;
};

// Initialize cache
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async (): Promise<typeof mongoose> => {
  const cache = globalWithMongoose.mongoose;

  if (cache.conn) {
    return cache.conn;
  }

  if (!env.db?.url) {
    throw new Error('DATABASE_URL is not defined');
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(env.db.url, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      dbName: 'Business',
    });
  }

  try {
    cache.conn = await cache.promise;

    console.info('MongoDB Connected 🚀');

    return cache.conn;
  } catch (err) {
    // 🔥 reset cache on failure (important for cold start retries)
    cache.promise = null;

    console.error('MongoDB connection failed', err);

    throw err;
  }
};
