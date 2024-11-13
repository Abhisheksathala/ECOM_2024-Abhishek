import Title from '../Components/Title';
import CartTotal from '../Components/CartTotal';
import { assets } from '../assets/assets';
import { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {
    navigate,
    backendURL,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const paymentMethods = [
    { id: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
    { id: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
    { id: 'cod', label: 'CASH ON DELIVERY' },
  ];
  let amount = getCartAmount() + delivery_fee;
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products).find(
              (product) => product._id === items,
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log(orderItems);

      // Ensure that 'amount' and 'date' are included in the orderData
      let orderData = {
        address: formData,
        items: orderItems,
        amount: Number(amount),
        paymentMethod: method,
      };

      if (method === 'cod') {
        // Cash on Delivery
        const response = await axios.post(
          `${backendURL}/api/order/placeorder`,
          orderData,
          { headers: { token } },
        );

        if (response.data.success) {
          setCartItems({}); // Clear cart after successful order
          toast.success(response.data.message);
          navigate('/orders'); // Navigate only on successful response
        } else {
          toast.error(response.data.message);
        }
      } else if (method === 'stripe') {
        const response = await axios.post(
          `${backendURL}/api/order/placeorderstripe`,
          orderData,
          { headers: { token } },
        );

        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
          setCartItems({});
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error('Please select a valid payment method.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to place order: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      <form className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1="Order Summary" text2="Shopping cart" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="name"
            placeholder="first name"
            value={formData.name}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            value={formData.lastname}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          name="street"
          placeholder="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            placeholder="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="zipcode"
            placeholder="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            name="country"
            placeholder="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        {/* Additional fields for city, state, etc. */}
      </form>

      <div className="mt-8 min-w-80">
        <CartTotal />
        <Title text1="payment" text2="method" />
        <div className="flex flex-col gap-3 lg:flex-row">
          {paymentMethods.map(({ id, label, logo }) => (
            <div
              key={id}
              onClick={() => setMethod(id)}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === id ? 'bg-green-400' : ''
                }`}
              ></p>
              {logo ? (
                <img src={logo} className="h-5 mx-4" alt={`${label} logo`} />
              ) : (
                <p className="mx-4 text-sm font-medium text-gray-500">
                  {label}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="w-full mt-8 text-end">
          <button
            className="px-16 py-3 text-sm text-white bg-black"
            type="submit"
            onClick={handlePlaceOrder}
          >
            PLACE-ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
