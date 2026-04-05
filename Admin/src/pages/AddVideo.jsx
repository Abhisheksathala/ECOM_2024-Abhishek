// pages/AddVideo.jsx
import { useState } from "react";
import axios from "axios";
import { BackendUrl } from "../App";
import { toast } from "react-toastify";

const AddVideo = ({ token }) => {
  const [formData, setFormData] = useState({
    videoUrl: "",
    title: "",
  });
  
  const [uploading, setUploading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.videoUrl) {
      toast.error("Video URL is required");
      return;
    }

    setUploading(true);

    try {
      const res = await axios.post(
        `${BackendUrl}/api/video/videos/add`,
        formData,
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("Video added successfully!");
        setFormData({
          videoUrl: "",
          title: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding video");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Add Video</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL (e.g., https://example.com/video.mp4)"
          value={formData.videoUrl}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="title"
          placeholder="Title (optional)"
          value={formData.title}
          onChange={onChangeHandler}
          className="border p-2 rounded"
        />

        {/* Video Preview */}
        {formData.videoUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <video
              src={formData.videoUrl}
              className="w-full h-48 object-cover rounded"
              controls
              muted
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className={`bg-black text-white py-2 rounded hover:bg-gray-800 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Adding..." : "Add Video"}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;