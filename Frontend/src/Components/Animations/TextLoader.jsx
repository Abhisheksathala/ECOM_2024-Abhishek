// "use client";

// import { useState } from "react";
// import TextLoader from "../ui/TextLoader"; 

// const TextLoaderDemo = () => {

//   const [activeDemo, setActiveDemo] = useState(null);

//   const demos = [
//     // {
//     //   id: 1,
//     //   title: "Red Gradient",
//     //   text: "DIMAAC",
//     //   gradientColors: ["#ff0000", "#ff3333", "#ff6600", "#cc0000"],
//     //   backgroundColor: "#17171A",
//     // },
//     // {
//     //   id: 2,
//     //   title: "Blue Ocean",
//     //   text: "OCEAN",
//     //   gradientColors: ["#0066ff", "#3399ff", "#00ccff", "#0099cc"],
//     //   backgroundColor: "#001122",
//     // },
//     {
//       id: 3,
//       title: "Purple Sunset",
//       text: "SUNSET",
//       gradientColors: ["#8B5CF6", "#A78BFA", "#C084FC", "#DDD6FE"],
//       backgroundColor: "#1F1B24",
//     },
//     // {
//     //   id: 4,
//     //   title: "Green Forest",
//     //   text: "FOREST",
//     //   gradientColors: ["#22c55e", "#16a34a", "#15803d", "#166534"],
//     //   backgroundColor: "#0a0f0a",
//     // },
//   ];

//   const handleStart = (demoId) => {
//     setActiveDemo(demoId);
//   };

//   const handleComplete = () => {
//     setActiveDemo(null);
//   };

//   const activeDemoData = demos.find((d) => d.id === activeDemo);

//   return (
//     <div className="flex items-center justify-center w-full p-8">

//       <div className="flex flex-wrap gap-4 justify-center">
//         {demos.map((demo) => (
//           <button
//             key={demo.id}
//             onClick={() => handleStart(demo.id)}
//             disabled={activeDemo !== null}
//             className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700"
//           >
//             {activeDemo === demo.id ? "Running..." : demo.title}
//           </button>
//         ))}
//       </div>

//       {/* Loader Overlay */}

//       {activeDemo && activeDemoData && (
//         <TextLoader
//           {...activeDemoData}
//           onComplete={handleComplete}
//           duration={{
//             slideUp: 0.8,
//             reveal: 1.2,
//             slideDown: 0.8,
//           }}
//           delays={{
//             stagger: 0.08,
//             betweenAnimations: 0.4,
//             beforeSlideDown: 0.8,
//           }}
//         />
//       )}

//     </div>
//   );
// };

// export default TextLoaderDemo;

"use client";

import { useState, useEffect } from "react";
import TextLoader from "../ui/TextLoader";

const TextLoaderDemo = () => {

  const [showLoader, setShowLoader] = useState(true);

  const handleComplete = () => {
    setShowLoader(false);
  };

  return (
    <div className="flex items-center justify-center w-full">

      {showLoader && (
        <TextLoader
          text="MADVIRE"
          gradientColors={["#8B5CF6", "#A78BFA", "#C084FC", "#DDD6FE"]}
          backgroundColor="#1F1B24"
          onComplete={handleComplete}
          duration={{
            slideUp: 0.8,
            reveal: 1.2,
            slideDown: 0.8,
          }}
          delays={{
            stagger: 0.08,
            betweenAnimations: 0.4,
            beforeSlideDown: 0.8,
          }}
        />
      )}

    </div>
  );
};

export default TextLoaderDemo;