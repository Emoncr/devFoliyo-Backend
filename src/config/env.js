/**
 * Centralized environment loader. Keeps config in one place.
 * Why: Avoids sprinkling process.env across the codebase and eases testing.
 */
import dotenv from 'dotenv';

dotenv.config();

const asInt = (v, fallback) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: asInt(process.env.PORT, 3000),
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me',
  jwtExpires: process.env.JWT_EXPIRES ?? '1h',
  saltRounds: asInt(process.env.SALT_ROUNDS, 10),
};

export const isProd = env.nodeEnv === 'production';
