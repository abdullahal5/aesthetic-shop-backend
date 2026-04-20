import type { Server } from 'http';
import app from './app.js';
import env from './config/index.js';
import { connectDB } from './core/database.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';

let server: Server;

// 🧹 Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  logger.warn(`Received ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      logger.warn('Closing HTTP server...');
      await new Promise((resolve) => server.close(resolve));
    }

    await mongoose.connection.close(false);
    logger.info('MongoDB disconnected cleanly 🧼');

    process.exit(0);
  } catch (err) {
    logger.error('Shutdown error:', err as Error);
    process.exit(1);
  }
};

// 💥 Crash handlers (must be early)
process.on('uncaughtException', (err) => {
  logger.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('⚠️ Unhandled Rejection:', reason as Error);
  process.exit(1);
});

// 📴 OS signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const startServer = async () => {
  try {
    await connectDB();

    const PORT = env.app.port;

    server = app.listen(PORT, () => {
      console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Server is running!
📍 URL: http://localhost:${PORT}
🏥 Health: http://localhost:${PORT}/api/health
🧪 Test: http://localhost:${PORT}/api/test
⏰ Started at: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);

      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

startServer();
