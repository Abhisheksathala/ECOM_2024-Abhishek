import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RotatingImage = () => {
  const containerRef = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
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
              className="w-32 h-32  object-cover absolute"
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
