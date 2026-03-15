// import { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, name, price, image }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <div className="bg-gray-50 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       <Link to={`/Product/${id}`} className="block text-gray-700">
//         <div className="overflow-hidden">
//           <img
//             src={image[0]}
//             className="w-full  object-cover transition-transform duration-300 hover:scale-105"
//             alt={name}
//           />
//         </div>
//         <div className="p-4">
//           <h3 className="text-lg font-medium mb-1">{name}</h3>
//           <p className="text-gray-500">
//             {currency}
//             {price}
//           </p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductItem;


import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import MouseTiltCard from "../Components/ui/MouseTiltCard"; // adjust path if needed

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <MouseTiltCard tiltIntensity={12} scale={1.03} glareIntensity={0.15}>
      <div className="bg-gray-50 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 lg:h-[26rem] ">
        <Link to={`/Product/${id}`} className="block text-gray-700">
          
          <div className="overflow-hidden">
            <img
              src={image[0]}
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
              alt={name}
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-medium mb-1">{name}</h3>

            <p className="text-gray-500">
              {currency}{price}
            </p>
          </div>

        </Link>
      </div>
    </MouseTiltCard>
  );
};

export default ProductItem;
