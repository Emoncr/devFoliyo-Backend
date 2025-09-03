import mongoose from 'mongoose';
import { env, isProd } from './env.js';

export async function connectDB() {
  if (!env.mongoUri) throw new Error('MONGO_URI not defined');

  try {
    await mongoose.connect(env.mongoUri, { dbName: 'my-express-api' });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    if (isProd) process.exit(1);
  }
}
