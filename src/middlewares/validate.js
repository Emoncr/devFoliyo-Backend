export function validate(schema) {
  return (req, res, next) => {
    try {
      // Parse will throw if invalid
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message })),
      });
    }
  };
}
