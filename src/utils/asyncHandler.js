/**
 * asyncHandler (Higher-Order Function)
 * ----------------------------------------
 * Wraps async route handlers to automatically catch errors
 * and forward them to Express global error middleware.
 *
 * Why we use this:
 * - Avoid repetitive try-catch blocks in every controller
 * - Ensure all async errors are properly handled
 * - Prevent unhandled promise rejections
 *
 * Without this:
 *   try {
 *     const data = await service();
 *     res.json(data);
 *   } catch (err) {
 *     next(err);
 *   }
 *
 * With this:
 *   exports.getData = asyncHandler(async (req, res) => {
 *     const data = await service();
 *     res.json(data);
 *   });
 *
 * @param {Function} fn - Async controller function (req, res, next)
 * @returns {Function} Express middleware function
 */

module.exports = (fn) => {

  // Return a new middleware function
  return (req, res, next) => {

    /**
     * Promise.resolve ensures:
     * - If fn is async → it returns a Promise
     * - If fn is sync → it gets wrapped into a resolved Promise
     *
     * .catch(next):
     * - If any error occurs inside fn (throw/reject),
     *   it is passed to Express error handler via next(err)
     */
    Promise
      .resolve(fn(req, res, next))
      .catch(next);
  };
};