require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const logger = require('../../logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });
app.use((req, res, next) => {
    console.log(`[EVENT-SERVICE] ${req.method} ${req.url}`);
    next();
});

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', eventRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    service: 'event-service',
    status: 'ok',
    uptime: process.uptime() + 's',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling
app.use((err, req, res, next) => { logger.error(err.stack); res.status(500).send('Something broke!'); });

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Event service running on port ${PORT}`);
});