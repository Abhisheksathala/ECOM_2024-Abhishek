import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InfiniteScrollText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Clone the content for seamless infinite scroll
    const clone = text.cloneNode(true);
    container.appendChild(clone);

    // Set up the animation
    const tl = gsap.to(text, {
      xPercent: -100,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.unitize((x) => parseFloat(x) % 100),
      },
    });

    // Pause on hover
    container.addEventListener("mouseenter", () => tl.pause());
    container.addEventListener("mouseleave", () => tl.resume());

    return () => {
      tl.kill();
      container.removeEventListener("mouseenter", () => tl.pause());
      container.removeEventListener("mouseleave", () => tl.resume());
    };
  }, []);

  return (
    <div className="w-full bg-black overflow-hidden py-8">
      <div
        ref={containerRef}
        className="relative overflow-hidden whitespace-nowrap"
      >
        <div
          ref={textRef}
          className="inline-block text-6xl md:text-8xl font-bold uppercase tracking-wider"
        >
          <span className="text-white">MADVIRA MAN • </span>
          <span className="text-orange-500">MADVIRA MAN • </span>
          <span className="text-white">MADVIRA MAN • </span>
          <span className="text-orange-500">MADVIRA MAN • </span>
          <span className="text-white">MADVIRA MAN • </span>
          <span className="text-orange-500">MADVIRA MAN • </span>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollText;