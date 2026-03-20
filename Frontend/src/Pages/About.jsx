// import React from "react";

// const About = () => {
//   return (
//     <div className="bg-gray-50 py-12 px-6 sm:px-12 text-center">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">About Forever</h1>
//       <p className="text-lg text-gray-700 mb-4">
//         Welcome to Forever, where we believe in timeless style and quality. Our
//         brand is dedicated to offering the finest clothing for men, women, and
//         kids, ensuring that you always look and feel your best.
//       </p>
//       <p className="text-lg text-gray-700 mb-4">
//         At Forever, we are passionate about fashion that lasts beyond the
//         trends. We curate collections that combine classic elegance with modern
//         flair, making sure that every piece is designed with care and attention
//         to detail.
//       </p>
//       <p className="text-lg text-gray-700">
//         Join us on our journey to redefine fashion with sustainability and
//         style. Thank you for being a part of the Forever family.
//       </p>
//     </div>
//   );
// };

// export default About;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const About = () => {
  const headingRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  const paragraph3Ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a timeline for sequential animations
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(
      [
        headingRef.current,
        paragraph1Ref.current,
        paragraph2Ref.current,
        paragraph3Ref.current,
      ],
      {
        opacity: 0,
        y: 30,
      },
    );

    // Animate elements one after another
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        paragraph1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      ) // Start 0.4s before previous animation ends
      .to(
        paragraph2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        paragraph3Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );

    // Add floating animation to the container background or add decorative elements
    gsap.to(containerRef.current, {
      backgroundPosition: "100% 100%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 sm:px-12 text-center relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 opacity-0"
        >
          About MADVIRA
        </h1>

        <div className="space-y-6">
          <p
            ref={paragraph1Ref}
            className="text-lg md:text-xl text-gray-700 leading-relaxed opacity-0"
          >
            Welcome to MADVIRA, where style meets confidence. Our brand is
            dedicated to delivering premium clothing for men, women, and kids,
            helping you express yourself with bold and modern fashion.
          </p>

          <p
            ref={paragraph2Ref}
            className="text-lg md:text-xl text-gray-700 leading-relaxed opacity-0"
          >
            At MADVIRA, we focus on creating designs that stand out while
            staying comfortable and practical. Every collection blends trend,
            quality, and attention to detail so you always look fresh and feel
            confident.
          </p>

          <p
            ref={paragraph3Ref}
            className="text-lg md:text-xl text-gray-700 leading-relaxed opacity-0"
          >
            Be part of MADVIRA and redefine your style with confidence and
            attitude. Thank you for being a part of our journey.
          </p>
        </div>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default About;
