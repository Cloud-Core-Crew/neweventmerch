const express = require('express');
const router = express.Router();
const httpProxy = require('http-proxy');

// Create proxy servers with error handling
const authProxy = httpProxy.createProxyServer({
    target: 'http://localhost:5001'
});

const eventProxy = httpProxy.createProxyServer({
    target: 'http://localhost:5002'
});

const merchProxy = httpProxy.createProxyServer({
    target: 'http://localhost:5003'
});

const orderProxy = httpProxy.createProxyServer({
    target: 'http://localhost:5004'
});

// Error handling middleware
const proxyErrorHandler = (err, req, res, target) => {
    console.error(`Proxy error for ${target}:`, err);
    res.status(500).json({
        error: 'Service unavailable',
        message: `Failed to connect to ${target}`
    });
};

// Add error handling to all proxies
authProxy.on('error', (err, req, res) => proxyErrorHandler(err, req, res, 'auth service'));
eventProxy.on('error', (err, req, res) => proxyErrorHandler(err, req, res, 'event service'));
merchProxy.on('error', (err, req, res) => proxyErrorHandler(err, req, res, 'merch service'));
orderProxy.on('error', (err, req, res) => proxyErrorHandler(err, req, res, 'order service'));

// Add proxy routes with error handling
router.use('/api/auth', (req, res) => {
    console.log(`Proxying auth request: ${req.method} ${req.url}`);
    authProxy.web(req, res, (err) => {
        if (err) proxyErrorHandler(err, req, res, 'auth service');
    });
});

router.use('/events', (req, res) => {
    eventProxy.web(req, res, (err) => {
        if (err) proxyErrorHandler(err, req, res, 'event service');
    });
});

router.use('/merch', (req, res) => {
    merchProxy.web(req, res, (err) => {
        if (err) proxyErrorHandler(err, req, res, 'merch service');
    });
});

router.use('/api/orders', (req, res) => {
    orderProxy.web(req, res, (err) => {
        if (err) proxyErrorHandler(err, req, res, 'order service');
    });
});

router.use('/api/events', (req, res) => {
    eventProxy.web(req, res, (err) => {
        if (err) proxyErrorHandler(err, req, res, 'event service');
    });
});

module.exports = router;