import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/Product/${id}`} className="block text-gray-700">
        <div className="overflow-hidden">
          <img
            src={image[0]}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            alt={name}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1">{name}</h3>
          <p className="text-gray-500">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
