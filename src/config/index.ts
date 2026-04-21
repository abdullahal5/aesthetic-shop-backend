import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const env = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    vercel: process.env.VERCEL,
  },

  db: {
    url: process.env.DATABASE_URL as string,
  },

  auth: {
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET as string,
      refreshSecret: process.env.JWT_REFRESH_SECRET as string,
      accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    admin: {
      username: process.env.ADMIN_USERNAME as string,
      password: process.env.ADMIN_PASSWORD as string,
    },
  },

  security: {
    resetPasswordUiLink: process.env.RESET_PASS_UI_LINK as string,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string,
  },
};

export default env;
