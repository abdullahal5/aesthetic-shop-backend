import type { ObjectId } from "mongoose";

export type TLoginRequest = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
  admin: {
    id: string;
    username: string;
    role: string;
    email?: string;
  };
};

export type TRefreshTokenResponse = {
  accessToken: string;
};

export type TJwtPayload = {
  id?: ObjectId;
  username: string;
  role: string;
};
