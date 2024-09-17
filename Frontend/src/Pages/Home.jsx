import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import Bestseller from "../Components/Bestseller";
import OurPolicy from "../Components/OurPolicy";
import Newsletter from "../Components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Bestseller />
      <OurPolicy />
      <Newsletter />
    </div>
  );
};

export default Home;
