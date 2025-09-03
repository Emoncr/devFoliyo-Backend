/**
 * 404 handler for unmatched routes.
 * Why: Explicit 404 keeps behavior consistent and debuggable.
 */
export function notFound(req, res, _next) {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
  });
}
