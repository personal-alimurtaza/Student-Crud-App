const validate = (schema, target = "body") => {
  return (req, res, next) => {
    const data = req[target];
    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({ type: "validation", errors });
    }
    req[target] = result.data;
    next();
  };
};

export { validate };
