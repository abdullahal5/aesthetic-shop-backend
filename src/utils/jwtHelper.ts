import jwt, {
  type JwtPayload,
  type Secret,
  type SignOptions,
} from 'jsonwebtoken';
import type { Types } from 'mongoose';

export type TJwtPayload = {
  id?: Types.ObjectId | string;
  username: string;
  role: string;
};

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: Secret,
  expiresIn: string,
): string => {
  const options = {
    expiresIn: expiresIn,
  } as SignOptions;

  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
