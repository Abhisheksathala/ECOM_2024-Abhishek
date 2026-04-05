// VideoSection.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { VideoCard } from './Reels';
import { ShopContext } from '../../Context/ShopContext';


const VideoSection = () => {
   const { backendURL } = useContext(ShopContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/video/videos`);
        if (response.data.success) {
          setVideos(response.data.videos);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  if (videos.length === 0) return null;

  return (
    <div className="px-4 py-6 mt-14 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">🔥 Trending Videos</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {videos.map((item) => (
          <VideoCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default VideoSection;