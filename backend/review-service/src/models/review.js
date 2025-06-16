import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  title: String,
  content: String,
  rating: Number
});

export default mongoose.model('Review', reviewSchema);
