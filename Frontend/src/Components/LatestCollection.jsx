import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import Title from "./Title";
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproducts, setLatestproducts] = useState([]);

  useEffect(() => {
    setLatestproducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST ARRIVALS" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs md:text-base sm:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        </p>
      </div>
      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestproducts.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
