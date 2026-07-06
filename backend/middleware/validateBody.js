const { ZodError } = require('zod');

/**
 * Middleware factory — validates req.body against a Zod schema.
 * Returns 400 with field errors on failure.
 */
const validateBody = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return res.status(400).json({ error: 'Validation failed', errors });
    }
    next(err);
  }
};

module.exports = { validateBody };
