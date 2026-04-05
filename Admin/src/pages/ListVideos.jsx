// pages/ListVideos.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../App";
import { toast } from "react-toastify";

const ListVideos = ({ token }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/video/videos`);
      if (response.data.success) {
        setVideos(response.data.videos);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id) => {
    if (window.confirm("Delete this video?")) {
      try {
        const res = await axios.delete(`${BackendUrl}/api/videos/${id}`, {
          headers: { token },
        });
        if (res.data.success) {
          toast.success("Video deleted");
          fetchVideos();
        }
      } catch (error) {
        console.log(error);
        toast.error("Error deleting video");
      }
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4">All Videos</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">
        All Videos ({videos.length})
      </h1>

      {videos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No videos added yet</p>
      ) : (
        <div className="space-y-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="flex items-center gap-4 p-3 border rounded-lg hover:shadow"
            >
              <video
                src={video.videoUrl}
                className="w-24 h-16 object-cover rounded"
                muted
              />

              <div className="flex-1">
                <p className="font-medium">{video.title || "Untitled Video"}</p>
                <p className="text-xs text-gray-400 truncate">
                  {video.videoUrl}
                </p>
                <p className="text-xs text-gray-400">
                  Added: {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => deleteVideo(video._id)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListVideos;
