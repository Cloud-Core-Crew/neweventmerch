const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  payment: {
    type: Object,
    default: {}
  },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
