import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import Bestseller from "../Components/Bestseller";
import OurPolicy from "../Components/OurPolicy";
import Newsletter from "../Components/Newsletter";
import ProductInfintScroll from "../Components/Animations/ProductScroll";
import TextLoaderDemo from "../Components/Animations/TextLoader";


const Home = () => {
  return (
    <div>
      <Hero />
      <ProductInfintScroll />
      <TextLoaderDemo />
      <LatestCollection />
      <Bestseller />
      <OurPolicy />
      <Newsletter />
    </div>
  );
};

export default Home;
