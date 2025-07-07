const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionOptions = {
            dbName: 'eventmerch',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            retryWrites: true,
            w: 'majority'
        };

        await mongoose.connect('mongodb://localhost:27017/eventmerch', connectionOptions);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
