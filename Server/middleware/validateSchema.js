export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    logger.warn("Validation failed", { issues: result.error.issues });

    const error = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return res.status(400).json({ ERROR: error });
  }
  req.body = result.data;
  next();
};
