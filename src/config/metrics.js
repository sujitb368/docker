const client = require('prom-client');

/**
 * 🧠 Collect default system metrics
 * CPU, memory, event loop lag, etc.
 */
client.collectDefaultMetrics();

/**
 * 📊 HTTP Request Counter
 * Counts total number of requests
 */
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

/**
 * ⏱️ Response Time Histogram
 * Measures request duration
 */
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

module.exports = {
  client,
  httpRequestCounter,
  httpRequestDuration
};