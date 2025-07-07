const express = require('express');
const cors = require('cors');
const httpProxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware
app.use(cors());
// Do NOT use express.json() or express.urlencoded() before proxy routes!

// Add logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Proxy configuration
const ordersProxy = httpProxy('http://localhost:5004', {
    proxyReqPathResolver: (req) => {
        console.log('Proxying orders request:', req.method, req.url);
        return req.url;
    },
    onError: (err, req, res) => {
        console.error('Orders proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to orders service'
        });
    }
});

// Use http-proxy-middleware for /api/events
app.use('/api/events', createProxyMiddleware({
    target: 'http://127.0.0.1:5002',
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
        console.error('Events proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to events service'
        });
    }
}));

// Routes
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }, // Strip /api/auth prefix
    logLevel: 'debug',
    onError: (err, req, res) => {
        console.error('Auth proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to auth service'
        });
    }
}));
app.use('/api/orders', ordersProxy);
// (events proxy is now handled above)

// If you need body parsing for other non-proxy routes, add it here AFTER the proxies:
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    if (!res.headersSent) {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    } else {
        next(err);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});

module.exports = app;