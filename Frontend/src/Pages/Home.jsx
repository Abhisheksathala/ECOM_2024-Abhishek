import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import Bestseller from "../Components/Bestseller";
import OurPolicy from "../Components/OurPolicy";
// import Newsletter from "../Components/Newsletter";
import ProductInfintScroll from "../Components/Animations/ProductScroll";
import Slider from "../Components/Slider";
// import TextLoaderDemo from "../Components/Animations/TextLoader";


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
      {/* <Newsletter /> */}
    </div>
  );
};

export default Home;
