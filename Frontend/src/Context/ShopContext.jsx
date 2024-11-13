import { createContext } from 'react';
// import { products } from '../assets/assets.js';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const deliver_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  const backendURL = 'http://localhost:4000';

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select size');
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = cartData[itemId][size]
        ? cartData[itemId][size] + 1
        : 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/add`,
          { itemId, size },
          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: { token },
          },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

  const getproductsdata = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      console.log(response.data); // This will log the full response structure
      if (response.data.success) {
        setProducts(response.data.products); // Use `response.data.products` here
        toast.success('Products fetched successfully');
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${backendURL}/api/cart/getCart`,
        {}, // Empty body if not needed
        {
          headers: {
            token, // Pass token directly as `token` key
          },
        },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else if (response.data.message) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getproductsdata();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(); // No need to pass token here explicitly
    }
  }, []);

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
    backendURL,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
