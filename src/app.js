import cors from 'cors';
import express from 'express';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import routes from './routes/index.js';

const app = express();

app.set('trust proxy', true);
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://devfoliyo.vercel.app',
      'https://devfoliyo.vercel.app',
      'https://dev-foliyo.vercel.app',
      'https://emondev.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', (req, res) => {
  return res.status(200).json({ message: 'Server is healthy' });
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// USING ROUTES AS MIDDLEWARES
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
