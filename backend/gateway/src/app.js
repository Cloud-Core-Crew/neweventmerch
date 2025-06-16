const express = require('express');
const cors = require('cors');
const httpProxy = require('express-http-proxy');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Proxy configuration
const authProxy = httpProxy('http://localhost:5001', {
    proxyReqPathResolver: (req) => {
        console.log('Proxying auth request:', req.method, req.url);
        return req.url;
    },
    onError: (err, req, res) => {
        console.error('Auth proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to auth service'
        });
    }
});

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

// Routes
app.use('/api/auth', authProxy);
app.use('/api/orders', ordersProxy);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});

module.exports = app;