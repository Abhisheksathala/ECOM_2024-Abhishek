import { createContext } from "react";
import { products } from "../assets/assets.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliver_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let CartData = structuredClone(cartItems);
    if (!size) {
      toast.error("Please select size");
      return;
    }

    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] += 1;
      } else {
        CartData[itemId][size] = 1;
      }
    } else {
      CartData[itemId] = {};
      CartData[itemId][size] = 1;
    }

    setCartItems(CartData);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const GetCartCount = () => {
    let Totalcount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            Totalcount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return Totalcount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let CartData = structuredClone(cartItems);
    CartData[itemId][size] = quantity;
    setCartItems(CartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    // Loop through cartItems
    for (const itemId in cartItems) {
      // Find the product based on the item's id
      const itemInfo = products.find((product) => product._id === itemId);

      // If the product is found
      if (itemInfo) {
        // Loop through the sizes or variants of the product in cartItems
        for (const size in cartItems[itemId]) {
          try {
            // Ensure the quantity is greater than 0
            if (cartItems[itemId][size] > 0) {
              // Multiply the price by the quantity and add to the total amount
              totalAmount += itemInfo.price * cartItems[itemId][size];
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    deliver_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    GetCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
