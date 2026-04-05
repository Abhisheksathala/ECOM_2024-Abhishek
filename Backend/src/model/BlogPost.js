// models/BlogPost.js
import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Style', 'Care', 'Trends', 'Fashion', 'Beauty']
  },
  image: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);