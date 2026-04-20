import type { Server } from 'http';
import app from './app.js';
import env from './config/index.js';
import { connectDB } from './core/database.js';
import mongoose from 'mongoose';

let server: Server;

// 🧹 Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.warn(`Received ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }

    await mongoose.connection.close(false);
    console.info('MongoDB disconnected cleanly 🧼');

    process.exit(0);
  } catch (err) {
    console.error('Shutdown error:', err as Error);
    process.exit(1);
  }
};

// 💥 Crash handlers
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('⚠️ Unhandled Rejection:', reason as Error);
  process.exit(1);
});

// 📴 OS signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const init = async () => {
  try {
    // 🔥 DB connect (safe cached version assumed)
    await connectDB();

    // 🚫 Only run server locally
    const isVercel = process.env.VERCEL === '1';

    if (!isVercel) {
      server = app.listen(env.app.port, () => {
        console.info(`🚀 Server running on http://localhost:${env.app.port}`);
      });
    }
  } catch (error) {
    console.error('Init failed', error as Error);
  }
};

init();

// 🌐 Vercel entrypoint
export default app;
