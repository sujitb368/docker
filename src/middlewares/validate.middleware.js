module.exports = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      return next(
        new (require('../utils/AppError'))(
          error.details[0].message.replace(/"/g, ''),
          400
        )
      );
    }

    next();
  };
};