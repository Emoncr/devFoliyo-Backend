import express from 'express';
import cors from 'cors';

import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

import routes from './routes/index.js';

const app = express();

app.set('trust proxy', true);
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', (req, res) => {
  return res.status(200).json({ message: 'Server is healthy' });
});

// USING ROUTES AS MIDDLEWARES
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
