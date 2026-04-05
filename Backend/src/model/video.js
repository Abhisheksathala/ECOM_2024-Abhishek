import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Trending Video'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Video', videoSchema);