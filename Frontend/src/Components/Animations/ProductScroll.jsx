import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const ProductInfintScroll = () => {
  
  const { products } = useContext(ShopContext);
  
  const images = products.slice(0, 10);
  return (
    <div className="w-full overflow-hidden py-4 mt-4 ">
      <div className="flex w-max animate-[scroll_20s_linear_infinite] gap-4">
        {[...images, ...images].map((item, index) => (
          <div key={index} className="w-[200px] h-[200px] flex-shrink-0 mx-2">
            <img
              src={item.image[0]} 
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfintScroll;
