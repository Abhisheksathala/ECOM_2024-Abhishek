export const VideoCard = ({ item }) => {
  // Function to check if URL is Instagram
  const isInstagramUrl = (url) => {
    return url?.includes('instagram.com/reel/') || url?.includes('instagram.com/p/');
  };

  // Convert Instagram URL to embed URL
  const getEmbedUrl = (url) => {
    if (url?.includes('instagram.com/reel/')) {
      const match = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/);
      if (match) {
        return `https://www.instagram.com/reel/${match[1]}/embed`;
      }
    }
    if (url?.includes('instagram.com/p/')) {
      const match = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
      if (match) {
        return `https://www.instagram.com/p/${match[1]}/embed`;
      }
    }
    return url;
  };

  return (
    <div className="min-w-[250px] h-[400px] rounded-xl overflow-hidden relative bg-black">
      {isInstagramUrl(item.videoUrl) ? (
        // Instagram Embed
        <iframe
          src={getEmbedUrl(item.videoUrl)}
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title={item.title || "Instagram Video"}
        />
      ) : (
        // Direct video file
        <video
          src={item.videoUrl}  // Changed from item.video to item.videoUrl
          muted
          loop
          autoPlay
          className="w-full h-full object-cover"
          controls
        />
      )}
    </div>
  );
};