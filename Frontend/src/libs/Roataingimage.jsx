import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RotatingImage = () => {
  const containerRef = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    "https://images.unsplash.com/photo-1542060748-10c28b62716f",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  ];

  const radius = 190;

  useEffect(() => {
    gsap.to(containerRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div ref={containerRef} className="relative w-[250px] h-[250px]">
        {images.map((img, i) => {
          const angle = (i / images.length) * 2 * Math.PI;

          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <img
              key={i}
              src={img}
              className="w-32 h-32 rounded-full object-cover absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            />
          );
        })}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default RotatingImage;
