/**
 * 🧠 Generic Retry Function
 *
 * @param {Function} fn - async function to retry
 * @param {number} retries - number of attempts
 * @param {number} delay - delay between retries (ms)
 */
module.exports = async function retry(fn, retries = 3, delay = 200) {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw err;

        await new Promise((res) => setTimeout(res, delay));

        return retry(fn, retries - 1, delay);
    }
};