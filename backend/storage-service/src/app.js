const express = require('express');
const cors = require('cors');
const storageRoutes = require('./routes/storageRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/storage', storageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Storage service running on port ${PORT}`);
});

module.exports = app;