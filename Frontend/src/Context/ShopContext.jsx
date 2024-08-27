import { createContext } from "react";
import { products } from "../assets/assets.js";

export const ShopContext = createContext();

const currency = "$";
const deliver_fee = 10;

const ShopContextProvider = (props) => {
  const value = {
    products,
    currency,
    deliver_fee,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
