/**
 * Central error handler (last in the chain).
 * Why: Single place to shape errors; prevents leaking internals in production.
 */
import { isProd } from '../config/env.js';

export function errorHandler(err, _req, res, _next) {
  const status = Number.isInteger(err?.statusCode) ? err.statusCode : 500;
  const code = err?.code || 'INTERNAL_ERROR';
  const message = err?.message || 'Something went wrong';

  if (!isProd) {
    // In dev, include stack for quicker debugging.
    return res.status(status).json({ code, message, stack: err?.stack });
  }

  return res.status(status).json({ code, message });
}
