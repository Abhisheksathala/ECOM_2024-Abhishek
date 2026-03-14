import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import MouseTiltCard from "../Components/ui/MouseTiltCard"; // adjust path if needed

const ProductItemsRounded = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <MouseTiltCard tiltIntensity={10} scale={1.02} glareIntensity={0.1}>
      <div className="bg-transparent w-48 h-48 rounded-full overflow-hidden  transition-all duration-300 flex flex-col items-center justify-center p-4 ">
        <Link
          to={`/Product/${id}`}
          className="block text-center text-gray-700 w-full"
        >
          <div className="overflow-hidden rounded-full w-24 h-24 mx-auto mb-2 border-2 border-gray-100 shadow-sm">
            <img
              src={image[0]}
              alt={name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="mt-1">
            <h3 className="text-sm font-medium truncate px-2">{name}</h3>
            <p className="text-gray-500 text-sm font-semibold mt-1">
              {currency}
              {price}
            </p>
          </div>
        </Link>
      </div>
    </MouseTiltCard>
  );
};

export default ProductItemsRounded;
