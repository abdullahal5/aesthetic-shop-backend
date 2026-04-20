import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import notFound from './middlewares/notFound.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import path from 'path';
import { SystemHealthService } from './utils/advancedSystemHealth.js';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.get('/api/health', (req: Request, res: Response) => {
  const healthData = SystemHealthService.getSystemHealth();
  res.status(200).json(healthData);
});

app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    message: 'API is working!',
    data: { test: 'Hello from AuraStore API' },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
  });
});

// 🚪 404 handler (must be AFTER routes)
app.use(notFound);

// 🚨 Global error handler (LAST middleware ALWAYS)
app.use(globalErrorHandler);

export default app;
