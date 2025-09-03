/**
 * Server bootstrap & graceful shutdown with MongoDB.
 * Why: Ensures DB connects before server starts, and clean shutdown of HTTP & MongoDB.
 */
import http from 'node:http';
import mongoose from 'mongoose';

import app from './app.js';
import { env, isProd } from './config/env.js';
import { connectDB } from './config/db.js';

async function bootstrap() {
  await connectDB();
  const server = http.createServer(app);

  server.listen(env.port, () => {
    console.log(`🚀 Server ready on http://localhost:${env.port}`);
  });

  



  //  Shutdown logic
  function shutdown(signal) {
    console.log(`\n${signal} received, shutting down...`);

    // Close HTTP server
    server.close(() => {
      console.log('HTTP server closed.');

      // Close MongoDB connection
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });

    // Fallback timer if hung connections
    setTimeout(() => process.exit(1), 10_000).unref();
  }

  // 4️⃣ Handle process signals & errors
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    shutdown('uncaughtException');
  });
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection:', reason);
    shutdown('unhandledRejection');
  });
}

// Bootstrap the server
bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  if (isProd) process.exit(1);
});
