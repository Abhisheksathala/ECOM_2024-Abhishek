// import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import Bestseller from "../Components/Bestseller";
import OurPolicy from "../Components/OurPolicy";
// import Newsletter from "../Components/Newsletter";
import ProductInfintScroll from "../Components/Animations/ProductScroll";
import Slider from "../Components/Slider";
import { motion } from "framer-motion";
// import TextLoaderDemo from "../Components/Animations/TextLoader";

const InfinityText = () => {
  return (
    <div className="flex justify-center items-center w-full bg-black/20">
      <svg width="900" height="400" viewBox="0 0 400 200">
        <path
          id="infinityPath"
          d="M50,100 C50,20 150,20 200,100 
              C250,180 350,180 350,100
              C350,20 250,20 200,100
              C150,180 50,180 50,100"
          fill="transparent"
          stroke="gray"
        />
        <motion.text fontSize="20" fill="white">
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

  return (
    <div>
      {/* <TextLoaderDemo /> */}
      {/* <Hero /> */}
      <Slider />
      <ProductInfintScroll />
      <LatestCollection />
      <Bestseller />
      <OurPolicy />
      <InfinityText />
      {/* <Newsletter /> */}

      {/* review setion man  */}
      <div className="overflow-hidden py-10 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-6">
          MADVIRA REVIEWS
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* moving container */}
          <div className="flex gap-6 animate-scroll whitespace-nowrap">
            {[...reviews, ...reviews].map((item, i) => (
              <div
                key={i}
                className="min-w-[250px] bg-white p-4 rounded-xl shadow-md"
              >
                <p className="text-gray-600 text-sm">"{item.text}"</p>
                <h4 className="mt-3 font-semibold">{item.name}</h4>
                <p className="text-yellow-500">{"⭐".repeat(item.rating)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
