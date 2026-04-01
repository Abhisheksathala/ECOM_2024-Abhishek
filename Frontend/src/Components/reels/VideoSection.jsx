import { VideoCard } from "./Reels";

const VideoSection = ({ videos }) => {
  return (
    <div className="px-4 py-6 mt-14 overflow-hidden">
      <h2 className="text-xl font-bold mb-4">🔥 Trending Videos</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {videos.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default VideoSection
