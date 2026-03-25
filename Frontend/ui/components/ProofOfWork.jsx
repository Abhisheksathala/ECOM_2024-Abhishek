import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../src/libs/utiles";

gsap.registerPlugin(ScrollTrigger);

const ProofOfWork = ({ title = "My Works", works, className }) => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDesktop(
        typeof window !== "undefined" ? window.innerWidth > 768 : true,
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Wait for all images to load
  useEffect(() => {
    const images = imageRefs.current.filter(Boolean);
    if (images.length === 0) return;

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach((imgEl) => {
      const img = imgEl.querySelector("img");
      if (img) {
        if (img.complete) {
          checkAllLoaded();
        } else {
          img.addEventListener("load", checkAllLoaded);
          img.addEventListener("error", checkAllLoaded);
        }
      } else {
        checkAllLoaded();
      }
    });
  }, [works]);

  useEffect(() => {
    const images = imageRefs.current.filter(Boolean);
    if (images.length === 0 || !imagesLoaded) return;

    // Kill any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === images[0] || trigger.vars.trigger === images[1]) {
        trigger.kill();
      }
    });

    const yOffset = isDesktop ? 500 : 350;
    const startTrigger = isDesktop ? "top 85%" : "top 90%";

    const triggers = [];

    images.forEach((imgEl, index) => {
      if (!imgEl) return;

      // Reset any existing animations
      gsap.set(imgEl, {
        rotation: index % 2 === 0 ? -50 : 50,
        transformOrigin: "center center",
        y: yOffset,
        opacity: 0,
      });

      const st = ScrollTrigger.create({
        trigger: imgEl,
        start: startTrigger,
        end: "bottom center",
        scroller: window,
        onEnter: () => {
          gsap.to(imgEl, {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: isDesktop && index % 2 === 1 ? 0.25 : 0,
          });
        },
        onEnterBack: () => {
          gsap.to(imgEl, {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
        },
      });
      triggers.push(st);
    });

    // Refresh ScrollTrigger to recalculate positions
    ScrollTrigger.refresh();

    return () => triggers.forEach((t) => t.kill());
  }, [works, isDesktop, imagesLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full bg-[#0B0B0F] px-6 py-20 text-white md:px-12 md:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-16 text-center text-3xl font-normal md:text-5xl">
          {title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {works.map((work, index) => (
            <div key={index} className="flex w-full flex-col">
              <div
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="relative w-full overflow-hidden"
              >
                <img
                  src={work.image}
                  alt={work.imageAlt ?? work.title}
                  className="aspect-square w-full object-cover object-top"
                />
              </div>
              <p className="mt-2 font-semibold uppercase text-white">
                {work.title}
              </p>
              <span className="mt-1 text-sm text-white/70">
                {work.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProofOfWork;