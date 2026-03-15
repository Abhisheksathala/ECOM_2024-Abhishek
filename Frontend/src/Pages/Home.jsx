import Hero from "../Components/Hero";
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
    <div className="flex justify-center items-center  bg-black">
      <svg width="400" height="200" viewBox="0 0 400 200">
        {/* Infinity path */}
        <path
          id="infinityPath"
          d="M50,100 C50,20 150,20 200,100 
              C250,180 350,180 350,100
              C350,20 250,20 200,100
              C150,180 50,180 50,100"
          fill="transparent"
          stroke="gray"
        />

        {/* Moving text */}
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
            Infinite Motion • Infinite Motion • Infinite Motion •
          </motion.textPath>
        </motion.text>
      </svg>
    </div>
  );
};

const Home = () => {
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
    </div>
  );
};

export default Home;
