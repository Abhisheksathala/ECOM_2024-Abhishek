// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, name, price, image }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <div className="bg-gray-50 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       <Link to={`/Product/${id}`} className="block text-gray-700">
//         <div className="overflow-hidden">
//           <img
//             src={image[0]}
//             className="w-full  object-cover transition-transform duration-300 hover:scale-105"
//             alt={name}
//           />
//         </div>
//         <div className="p-4">
//           <h3 className="text-lg font-medium mb-1">{name}</h3>
//           <p className="text-gray-500">
//             {currency}
//             {price}
//           </p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductItem;

// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";
// import MouseTiltCard from "../Components/ui/MouseTiltCard"; // adjust path if needed

// const ProductItem = ({ id, name, price, image }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <MouseTiltCard tiltIntensity={12} scale={1.03} glareIntensity={0.15}>
//       <div className="bg-gray-50 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 lg:h-[26rem] ">
//         <Link to={`/Product/${id}`} className="block text-gray-700">

//           <div className="overflow-hidden">
//             <img
//               src={image[0]}
//               className="w-full object-cover transition-transform duration-300 hover:scale-105"
//               alt={name}
//             />
//           </div>

//           <div className="p-4">
//             <h3 className="text-lg font-medium mb-1">{name}</h3>

//             <p className="text-gray-500">
//               {currency}{price}
//             </p>
//           </div>

//         </Link>
//       </div>
//     </MouseTiltCard>
//   );
// };

// export default ProductItem;

import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import MouseTiltCard from "../Components/ui/MouseTiltCard";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Create an array of images (if you have multiple images in your product)
  // For now, using the same image but you can modify this if you have multiple images
  const images = Array.isArray(image) ? image : [image];

  // Auto-slide images on hover
  useEffect(() => {
    let interval;
    if (isHovering && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, images.length]);

  // Reset to first image when hover ends
  useEffect(() => {
    if (!isHovering) {
      setCurrentImageIndex(0);
    }
  }, [isHovering]);

  return (
  
      <div
        className=" overflow-hidden  hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 group relative h-full flex flex-col"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Link to={`/Product/${id}`} className="block h-full flex flex-col">
          <div className="overflow-hidden relative flex-shrink-0">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="w-full flex-shrink-0">
                  <img
                    src={img}
                    className="w-full object-cover transition-all duration-700 group-hover:scale-110"
                    alt={name}
                    style={{ height: "auto" }}
                  />
                </div>
              ))}
            </div>

            {images.length > 1 && isHovering && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentImageIndex === idx
                        ? " w-4 sm:w-6 shadow-lg"
                        : "bg-white/50 w-1 sm:w-1.5 hover:bg-white/80"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Quick View Button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <button className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-gray-900 hover:text-white shadow-xl">
                Quick View
              </button>
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 sm:translate-x-4 group-hover:translate-x-0 hover:bg-white shadow-lg">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 hover:text-red-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col">
            {/* Product Title */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 sm:line-clamp-1">
              {name}
            </h3>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {currency}
                {price}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 line-through">
                {currency}
                {price + 500}
              </p>
              <span className="text-[10px] sm:text-xs font-semibold text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                17% OFF
              </span>
            </div>
          </div>
        </Link>
      </div>
 
  );
};

export default ProductItem;
