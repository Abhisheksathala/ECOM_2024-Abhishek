import { ShopContext } from "../Context/ShopContext";
import { useContext, useEffect, useState } from "react";
import Title from "./../Components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { cartItems, currency, products, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    // Initialize an array to hold the cart data
    const tempData = [];

    // Iterate over each item in cartItems
    for (const itemId in cartItems) {
      // Iterate over each size for the current item
      for (const size in cartItems[itemId]) {
        // Check if the quantity for this size is greater than 0
        if (cartItems[itemId][size] > 0) {
          // Push an object with item details to tempData
          tempData.push({
            _id: itemId, // Unique identifier for the item
            size: size, // Size of the item
            Quantity: cartItems[itemId][size], // Quantity of the item for this size
          });
        }
      }
    }

    // Update cartData with the new array
    setCartData(tempData);
  }, [cartItems]); // Dependency array: effect runs when cartItems changes
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 ">
        <Title text1="Cart" />
      </div>
      <div className="">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              className="py-4 border-t  border-b text-gray-700  grid grid-cos-[4fr_2fr_0.5fr] items-center gap-4"
              key={index}
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <div className="text-lg font-semibold">
                    {productData.name}
                  </div>
                  <div className="text-sm">{item.size}</div>
                  <div className="text-sm">
                    {currency} {productData.price}
                  </div>
                </div>
                <input
                  className="text-sm border max-w-[40px] sm:max-w-[80px] sm:px-2 py-1"
                  onChange={(e) => {
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, item.size, e.target.value);
                  }}
                  type="number"
                  min={1}
                  defaultValue={item.Quantity}
                />
                <img
                  src={assets.bin_icon}
                  alt=""
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex  justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                navigate("/place-order");
              }}
              className="bg-black  text-white text-sm my-8 py-3 px-4 "
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
