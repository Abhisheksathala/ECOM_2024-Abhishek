// import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import Bestseller from "../Components/Bestseller";
import OurPolicy from "../Components/OurPolicy";
// import Newsletter from "../Components/Newsletter";
import ProductInfintScroll from "../Components/Animations/ProductScroll";
import Slider from "../Components/Slider";
import { motion } from "framer-motion";
import ScrollingGallery from "../Components/ui/ScrollingGallery";
// import TextLoaderDemo from "../Components/Animations/TextLoader";

const InfinityText = () => {
  return (
    <div className="flex justify-center items-center w-full bg-black mt-5">
      <svg
        width="100%"
        height="300"
        viewBox="0 0 1200 200"
        className="max-w-7xl"
      >
        <path
          id="infinityPath"
          d="M100,100 
             C100,10 500,10 600,100 
             C700,190 1100,190 1100,100
             C1100,10 700,10 600,100
             C500,190 100,190 100,100"
          fill="transparent"
          stroke="gray"
          strokeWidth="2"
        />

        <motion.text fontSize="24" fill="white">
          <motion.textPath
            href="#infinityPath"
            startOffset="0%"
            animate={{ startOffset: ["0%", "100%"] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            MADVIRA MAN • MADVIRA MAN • MADVIRA MAN •
          </motion.textPath>
        </motion.text>
      </svg>
    </div>
  );
};

const Home = () => {
  const reviews = [
    { name: "Rahul", text: "Amazing quality bro 🔥", rating: 5 },
    { name: "Priya", text: "Loved the design 😍", rating: 4 },
    { name: "Amit", text: "Worth every rupee 💯", rating: 5 },
    { name: "Sneha", text: "Super comfy clothes 👌", rating: 4 },
  ];

  const galleryImages = [
    {
      src: "https://ui.dimaac.com/_next/image?url=%2Fgori.png&w=640&q=75", // or your image URL
      alt: "Product 1",
      speed: 0.8, // optional: controls scroll speed for each image
    },
    {
      src: "https://ui.dimaac.com/_next/image?url=%2Fgori.png&w=640&q=75",
      alt: "Product 2",
      speed: 1.2,
    },
    {
      src: "https://ui.dimaac.com/_next/image?url=%2Fgori.png&w=640&q=75",
      alt: "Product 3",
      speed: 0.6,
    },
    {
      src: "https://ui.dimaac.com/_next/image?url=%2Fgori.png&w=640&q=75",
      alt: "Product 4",
      speed: 1.5,
    },
    // Add as many images as you want
  ];

  return (
    <div>
      {/* <TextLoaderDemo /> */}
      {/* <Hero /> */}
      <Slider />
      <ProductInfintScroll />
      <LatestCollection />
      <Bestseller />
      {galleryImages.length > 0 && (
        <ScrollingGallery images={galleryImages} id="product-gallery" />
      )}
      <OurPolicy />
      <InfinityText />
      {/* <Newsletter /> */}
      {/* review setion man  */}
      <div className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-orange-500 tracking-wider uppercase">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-3">
              Loved by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">
                10,000+
              </span>{" "}
              Customers
            </h2>
            <p className="text-gray-600">
              Real stories from our amazing community
            </p>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="flex gap-8 animate-scroll-slow whitespace-nowrap py-8">
              {[...reviews, ...reviews].map((item, i) => (
                <div
                  key={i}
                  className="min-w-[350px] backdrop-blur-xl bg-white/30 rounded-2xl shadow-xl border border-white/50 p-6 hover:bg-white/40 transition-all duration-500 transform hover:-translate-y-3 group"
                >
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">⭐ 5.0 Rating</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-normal mb-4">
                    {item.text}
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < item.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">10K+</div>
              <div className="text-sm text-gray-500">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">4.8</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">500+</div>
              <div className="text-sm text-gray-500">5-Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
