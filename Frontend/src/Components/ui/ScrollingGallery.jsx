"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAPAdvancedResize } from "../../libs/useGSAPResize";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingGallery({ images, id = "wrapper" }) {
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateVisibleHeight = () => {
    const wrapperElement = wrapperRef.current;
    const contentElement = contentRef.current;

    if (!wrapperElement || !contentElement) return 0;

    // Calculate total scrollable height
    const wrapperHeight = wrapperElement.clientHeight;
    const contentHeight = contentElement.scrollHeight;
    const scrollableHeight = contentHeight - wrapperHeight;

    return scrollableHeight > 0 ? contentHeight : wrapperHeight;
  };

  // Handle parallax scroll effect for images
  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const imagesInGallery = content.querySelectorAll("img");

    // Create scroll trigger for the wrapper
    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        // Parallax effect for images based on scroll
        imagesInGallery.forEach((img, index) => {
          const speed = parseFloat(img.dataset.speed) || 1;
          const yOffset = self.progress * 100 * speed;
          gsap.set(img, {
            y: yOffset * 0.5,
            ease: "none",
          });
        });

        setScrollProgress(self.progress);
      },
    });

    // Skew effect on scroll
    const handleScroll = () => {
      const scrollTop = wrapper.scrollTop;
      const maxScroll = content.scrollHeight - wrapper.clientHeight;
      const velocity = (scrollTop - (window.lastScrollTop || 0)) / 10;
      window.lastScrollTop = scrollTop;

      const clamp = gsap.utils.clamp(-8, 8);
      const skewValue = clamp(velocity / -5);

      imagesInGallery.forEach((img) => {
        gsap.to(img, {
          skewY: skewValue,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    wrapper.addEventListener("scroll", handleScroll);

    // Update height on resize
    const updateHeight = () => {
      const newHeight = calculateVisibleHeight();
      setDynamicHeight(newHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      scrollTrigger.kill();
      wrapper.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, [images]);

  useGSAPAdvancedResize({
    onResize: () => {
      setTimeout(() => {
        const newHeight = calculateVisibleHeight();
        setDynamicHeight(newHeight);
        ScrollTrigger.refresh();
      }, 100);
    },
    dependencies: [id, images],
  });

  return (
    <div className="relative w-full my-8">
      <style>{`
        #${id} {
          position: relative;
          height: ${dynamicHeight}px !important;
          min-height: 400px;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        #${id}::-webkit-scrollbar {
          width: 6px;
        }
        
        #${id}::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        #${id}::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        
        #${id}::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

      <div
        ref={wrapperRef}
        id={id}
        className="w-full overflow-y-auto scroll-container"
      >
        <div ref={contentRef} id={id + "content"} className="w-full">
          <div className="flex flex-col w-full justify-center items-center gap-8 py-8">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                width={500}
                height={500}
                className={`w-1/4 aspect-square object-cover object-top transition-transform duration-300 hover:scale-105 ${
                  index % 2 === 1 ? "mr-[150px]" : "-mr-[150px]"
                }`}
                data-speed={img.speed || 0.8}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Optional: Scroll Progress Indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className="h-32 w-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="w-full bg-blue-500 rounded-full transition-all duration-200"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
