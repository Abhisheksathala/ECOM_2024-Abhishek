// import { assets } from "../assets/assets";

// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-400">
//       {/* hero left */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
//         <div className="text-[#414141]">
//           <div className="flex items-center gap-2">
//             <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
//             <p className="font-medium text-sm md:text-bass">OUR BEST SELLER</p>
//           </div>
//           <h1 className="prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed">
//             Latest Arrivals
//           </h1>
//           <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
//             <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
//           </div>
//         </div>
//       </div>
//       {/* hero right */}
//       <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
//       {/* <img src={"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"} className="w-full sm:w-1/2" alt="" /> */}
//     </div>
//   );
// };

// export default Hero;

import { assets } from "../assets/assets";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const Hero = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // split text
    const split = new SplitType(titleRef.current, { types: "chars" });

    const tl = gsap.timeline();

    tl.from(split.chars, {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col sm:flex-row border border-gray-400"
    >
      {/* hero left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-bass">OUR BEST SELLER</p>
          </div>

          <h1
            ref={titleRef}
            className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
          >
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* hero right */}

      <div
        className="w-full sm:w-1/2 overflow-hidden"
      >
        <img
          ref={imageRef}
          src={assets.hero_img}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
