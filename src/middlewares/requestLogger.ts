import morgan from 'morgan';
import logger from '../utils/logger.js';

// 🧠 Custom stream for morgan → winston
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// 🌐 HTTP request logger
export const requestLogger = morgan('combined', { stream });
