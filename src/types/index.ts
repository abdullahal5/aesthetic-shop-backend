import type { IUser } from '../middlewares/auth.middleware.js';

export {};

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}