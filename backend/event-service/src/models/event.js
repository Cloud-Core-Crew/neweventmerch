const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
        // Temporarily remove future date validation for debugging
        // validate: {
        //     validator: function(value) {
        //         return value >= new Date();
        //     },
        //     message: 'Event date must be in the future'
        // }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    venue: {
        type: String,
        required: [true, 'Venue is required'],
        trim: true,
        minlength: [3, 'Venue must be at least 3 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Music', 'Sports', 'Conferences', 'Charity', 'Other']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Pre-save middleware to update timestamps
eventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create indexes
eventSchema.index({ date: 1 }, { background: true });

// Custom error handling for validation errors
eventSchema.statics.handleValidationError = function(err) {
    const errors = {};
    Object.keys(err.errors).forEach(key => {
        errors[key] = err.errors[key].message;
    });
    return errors;
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;