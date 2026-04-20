import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const localTimestamp = () => {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka', // change if needed
    hour12: false,
  });
};

// 🧠 Log format (structured + readable timestamp)
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: localTimestamp }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// 📁 Ensure logs go inside /logs folder
const logDir = path.join(process.cwd(), 'logs');

// 🔁 General logs (daily rotation)
const dailyRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'info',
});

// ❌ Error logs (separate file, longer retention)
const errorRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  level: 'error',
});

// 🧾 Logger instance
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,

  transports: [
    dailyRotateTransport,
    errorRotateTransport,

    // 💻 Console (dev friendly)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => {
          return `[${info.timestamp}] ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});

export default logger;
