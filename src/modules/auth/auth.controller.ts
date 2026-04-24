import type { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import httpStatus from 'http-status';
import sendResponse from '../../utils/responseHandler.js';
import * as AuthService from './auth.service.js';
import type { AuthRequest } from '../../middlewares/auth.middleware.js';

export class AuthController {
  // Login controller
  static login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  // Refresh token controller
  static refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    console.log('cookies refresh token', refreshToken)

    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Token refreshed successfully',
      data: result,
    });
  });

  // Logout controller
  static logout = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.logout();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result.message,
      data: null,
    });
  });

  // Get admin info controller
  static getAdminInfo = catchAsync(async (req: AuthRequest, res: Response) => {
    const adminId = req.user?.id as string;

    if (!adminId) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'Admin not authenticated',
        data: null,
      });
    }

    const result = await AuthService.getAdminInfo(adminId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin info retrieved successfully',
      data: result,
    });
  });
}
