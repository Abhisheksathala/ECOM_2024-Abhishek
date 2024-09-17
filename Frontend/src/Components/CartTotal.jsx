import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";

const CartTotal = () => {
  const { currency, deliver_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="Cart Total" text2={currency + getCartAmount()} />
      </div>
      <div className="flex  gap-2 mt-2 text-sm flex-col">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency + getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery fee</p>
          <p>{currency + deliver_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliver_fee}
            .00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
