import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div className="">
      <Link className="text-gray-600" to={`/Product/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image[0]}
            className="hover:scale-110 transition ease-in-out"
            alt=""
          />
          <p className="pt-3 pb-1 text-sm">{name}</p>
          <p className="text-sm font-medium">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
