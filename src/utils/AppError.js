/**
 * Custom Application Error Class
 * ----------------------------------------
 * This class extends the native JavaScript Error object
 * to provide standardized error handling across the app.
 *
 * Why we use this:
 * - To differentiate between operational errors (expected)
 *   and programming errors (unexpected bugs)
 * - To attach HTTP status codes to errors
 * - To control what gets sent to the client vs logs
 *
 * Example usage:
 *   throw new AppError('Stock not found', 404);
 */

class AppError extends Error {

    /**
     * @param {string} message - Human-readable error message
     * @param {number} statusCode - HTTP status code (e.g., 404, 500)
     */
    constructor(message, statusCode) {
        // Call parent Error constructor
        super(message);

        /**
         * HTTP status code for the error
         * Example: 404 (Not Found), 500 (Server Error)
         */
        this.statusCode = statusCode;

        /**
         * Status type:
         * - 'fail' → client-side errors (4xx)
         * - 'error' → server-side errors (5xx)
         */
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

        /**
         * Marks this error as an "operational error"
         * (i.e., expected error like invalid input, not a bug)
         *
         * Helps in:
         * - Sending safe messages to client
         * - Logging differently in production
         */
        this.isOperational = true;

        /**
         * Captures stack trace (removes constructor call from stack)
         * Improves debugging clarity
         */
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;