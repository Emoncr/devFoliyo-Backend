import mongoose from 'mongoose';
import { env, isProd } from './env.js';

export async function connectDB() {
  if (!env.mongoUri) throw new Error('MONGO_URI not defined');

  try {
    await mongoose.connect(env.mongoUri, {
      dbName: 'devfoliyo',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    if (isProd) process.exit(1);
  }
}
