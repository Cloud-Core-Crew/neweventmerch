const mongoose = require('mongoose');

const merchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Merch', merchSchema);