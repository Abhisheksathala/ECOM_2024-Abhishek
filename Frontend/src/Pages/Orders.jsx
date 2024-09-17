import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import Title from "../Components/Title";

const Orders = () => {
  const { currency, products } = useContext(ShopContext);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Orders Title */}
      <div className="text-center mb-8">
        <Title text1="Orders" text2="History" />
      </div>

      {/* Order Items */}
      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row justify-between items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200"
          >
            {/* Product Image and Info */}
            <div className="flex items-center">
              <img
                src={item.image[0]}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {currency}
                  {item.price}
                </p>
              </div>
            </div>

            {/* Quantity and Size */}
            <div className="flex flex-col items-center lg:items-start mt-4 lg:mt-0">
              <h3 className="text-gray-600 text-sm">
                <span className="font-medium">Quantity: </span>
                {item.quantity}
              </h3>
              <h3 className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Size: </span>
                {item.sizes}
              </h3>
            </div>

            {/* Date */}
            <div className="flex flex-col items-center lg:items-end mt-4 lg:mt-0">
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Date: </span>
                25-4-2024
              </p>
            </div>
            {/* somthing */}
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <div className="min-w-2 h-2 rounded-ull bg-green-500"></div>
                <p className="text-sm md:text-basse">ready to ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
