import httpStatus from 'http-status';
import type {
  TLoginRequest,
  TLoginResponse,
  TRefreshTokenResponse,
} from './auth.types.js';
import AppError from '../../utils/AppError.js';
import env from '../../config/index.js';
import {
  createToken,
  verifyToken,
  type TJwtPayload,
} from '../../utils/jwtHelper.js';
import {
  findAdminByUsername,
  updateLastLogin,
  findAdminById,
} from '../admin/admin.service.js';

// Login with admin credentials from database
export const login = async (
  credentials: TLoginRequest,
): Promise<TLoginResponse> => {
  const { username, password } = credentials;

  if (!username || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Username and password are required',
    );
  }

  // Find admin from database
  const admin = await findAdminByUsername(username);

  if (!admin) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  // Check if admin is active
  if (!admin.isActive) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Account is deactivated');
  }

  // Validate password - comparePassword is defined in the model
  const isPasswordValid = await admin.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  // Update last login - convert ObjectId to string
  await updateLastLogin(admin._id.toString());

  // Create JWT payload
  const jwtPayload: TJwtPayload = {
    id: admin._id.toString(),
    username: admin.username,
    role: admin.role,
  };

  // Generate tokens
  const accessToken = createToken(
    jwtPayload,
    env.auth.jwt.accessSecret,
    env.auth.jwt.accessExpiresIn,
  );

  const refreshToken = createToken(
    jwtPayload,
    env.auth.jwt.refreshSecret,
    env.auth.jwt.refreshExpiresIn,
  );

  return {
    accessToken,
    refreshToken,
    admin: {
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    },
  };
};

// Refresh access token
export const refreshToken = async (
  refreshToken: string,
): Promise<TRefreshTokenResponse> => {
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Refresh token is required');
  }

  try {
    const decoded = verifyToken(refreshToken, env.auth.jwt.refreshSecret);
    const admin = await findAdminByUsername(decoded.username);

    if (!admin || !admin.isActive) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Admin not found or inactive',
      );
    }

    const jwtPayload: TJwtPayload = {
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    };

    const newAccessToken = createToken(
      jwtPayload,
      env.auth.jwt.accessSecret,
      env.auth.jwt.accessExpiresIn,
    );

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid or expired refresh token',
    );
  }
};

// Logout
export const logout = async (): Promise<{ message: string }> => {
  return { message: 'Logged out successfully' };
};

// Get admin info
export const getAdminInfo = async (adminId: string) => {
  const admin = await findAdminById(adminId);
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return admin;
};
