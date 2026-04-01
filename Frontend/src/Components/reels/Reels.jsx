export const VideoCard = ({ item }) => {
  return (
    <div className="min-w-[250px] h-[400px] rounded-xl overflow-hidden relative bg-black">
      
      {/* VIDEO */}
      <video
        src={item.video}
        muted
        loop
        autoPlay
        className="w-full h-full object-cover"
      />

      {/* INFO */}
      <div className="absolute bottom-3 left-3 text-white">
        <h2 className="text-sm font-bold">{item.name}</h2>
        <p className="text-xs">₹ {item.price}</p>
      </div>

    </div>
  );
};