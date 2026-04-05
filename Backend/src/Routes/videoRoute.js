// routes/videoRoutes.js
import express from 'express';
import Video from "../model/video.js";

const Videorouter = express.Router();

// Get all videos
Videorouter.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ success: true, videos });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Add video (Admin)
Videorouter.post('/videos/add', async (req, res) => {
  try {
    const { videoUrl, title } = req.body;
    const newVideo = new Video({ videoUrl, title });
    await newVideo.save();
    res.json({ success: true, message: 'Video added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default Videorouter;