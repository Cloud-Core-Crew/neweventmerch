import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: String,
  orderId: String,
  amount: Number,
  status: { type: String, default: 'success' }
});

export default mongoose.model('Payment', paymentSchema);
