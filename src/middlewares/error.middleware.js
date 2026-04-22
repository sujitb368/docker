/**
 * Global Error Handling Middleware (Express)
 * ----------------------------------------
 * This middleware catches all errors passed via `next(err)`
 * and sends a standardized response to the client.
 *
 * It should be the LAST middleware in the app.
 *
 * Why we use this:
 * - Centralized error handling
 * - Consistent API response format
 * - Avoid exposing sensitive internal errors
 *
 * Flow:
 *   Controller → asyncHandler → next(err) → this middleware
 *
 * @param {Object} err - Error object (can be AppError or native Error)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function (not used here but required)
 */

module.exports = (err, req, res, next) => {

  /**
   * Log the error for debugging purposes
   * In production, replace this with a logger (Winston, Pino, etc.)
   */
  console.error('ERROR :', err);

  /**
   * If error has a defined statusCode (like AppError),
   * use it; otherwise default to 500 (Internal Server Error)
   */
  let statusCode = err.statusCode || 500;

  /**
   * Use provided error message if available,
   * otherwise fallback to a generic message
   */
  let message = err.message || 'Internal Server Error';

  if (!err.isOperational) {
    message = 'Something went wrong';
  }

  /**
   * Send standardized error response
   * This keeps API responses consistent across the app
   * Route → Controller
        ↓
      asyncHandler
        ↓
      throw new AppError()
          ↓
      next(err)
          ↓
      Global Error Middleware (this file)
          ↓
      Client gets clean JSON response
   */
  res.status(statusCode).json({
    success: false,
    message
  });
};