import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import Title from "./Title";
import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import ProductItemsRounded from "./ProductItemsRounded";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproducts, setLatestproducts] = useState([]);

  useEffect(() => {
    setLatestproducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-start py-8 text-3xl">
        <Title text1="MADVIRA" text2="LATEST ARRIVALS" />

        <p className=" m-auto text-xs md:text-base sm:text-base text-gray-600 text-left">
          Fresh styles just dropped — explore Madvira’s newest collection
          designed for comfort and confidence.
        </p>
      </div>
      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 gap-4">
        {latestproducts.map((item, index) => {
          return (
            // <ProductItemsRounded
            //   key={index}
            //   id={item._id}
            //   name={item.name}
            //   price={item.price}
            //   image={item.image}
            // />
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              size={item.sizes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
