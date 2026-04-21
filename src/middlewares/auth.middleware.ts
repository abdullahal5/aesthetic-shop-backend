import { type NextFunction, type Request, type Response } from 'express';
import httpStatus from 'http-status';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import env from '../config/index.js';
import type { ObjectId } from 'mongoose';

export interface IUser {
  id?: ObjectId | string;
  username: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export type TUserRole = 'admin';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: AuthRequest, _res: Response, next: NextFunction) => {
      // Get token from authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized! Token is missing.',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized! Invalid token format.',
        );
      }

      try {
        // Verify the token
        const decoded = jwt.verify(
          token,
          env.auth.jwt.accessSecret,
        ) as JwtPayload;

        const { username, role, id } = decoded;

        // Check if username exists
        if (!username) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token payload');
        }

        // Check if role is admin
        if (role !== 'admin') {
          throw new AppError(
            httpStatus.FORBIDDEN,
            'Access denied. Admin only.',
          );
        }

        // Check if required roles are provided and match
        if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            'You do not have permission to access this resource.',
          );
        }

        // Attach user info to request
        req.user = {
          username,
          role,
        };

        next();
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Invalid token. Please login again.',
          );
        }
        if (error instanceof jwt.TokenExpiredError) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Token expired. Please login again.',
          );
        }
        throw error;
      }
    },
  );
};

export default auth;
