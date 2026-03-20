// import Title from '../Components/Title';
// import CartTotal from '../Components/CartTotal';
// import { assets } from '../assets/assets';
// import { useState, useContext } from 'react';
// import { ShopContext } from '../Context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const PlaceOrder = () => {
//   const [method, setMethod] = useState('cod');
//   const {
//     navigate,
//     backendURL,
//     token,
//     cartItems,
//     setCartItems,
//     getCartAmount,
//     delivery_fee,
//     products,
//   } = useContext(ShopContext);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: '',
//   });

//   const onChangeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const paymentMethods = [
//     { id: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
//     { id: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
//     { id: 'cod', label: 'CASH ON DELIVERY' },
//   ];
//   let amount = getCartAmount() + delivery_fee;
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     try {
//       let orderItems = [];

//       for (const items in cartItems) {
//         for (const item in cartItems[items]) {
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(products).find(
//               (product) => product._id === items,
//             );
//             if (itemInfo) {
//               itemInfo.size = item;
//               itemInfo.quantity = cartItems[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       console.log(orderItems);

//       // Ensure that 'amount' and 'date' are included in the orderData
//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: Number(amount),
//         paymentMethod: method,
//       };

//       if (method === 'cod') {
//         // Cash on Delivery
//         const response = await axios.post(
//           `${backendURL}/api/order/placeorder`,
//           orderData,
//           { headers: { token } },
//         );

//         if (response.data.success) {
//           setCartItems({}); // Clear cart after successful order
//           toast.success(response.data.message);
//           navigate('/orders'); // Navigate only on successful response
//         } else {
//           toast.error(response.data.message);
//         }
//       } else if (method === 'stripe') {
//         const response = await axios.post(
//           `${backendURL}/api/order/placeorderstripe`,
//           orderData,
//           { headers: { token } },
//         );

//         if (response.data.success) {
//           const { session_url } = response.data;
//           window.location.replace(session_url);
//           setCartItems({});
//           toast.success(response.data.message);
//         } else {
//           toast.error(response.data.message);
//         }
//       } else {
//         toast.error('Please select a valid payment method.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to place order: ' + error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
//       <form className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="my-3 text-xl sm:text-2xl">
//           <Title text1="Order Summary" text2="Shopping cart" />
//         </div>
//         <div className="flex gap-3">
//           <input
//             type="text"
//             name="name"
//             placeholder="first name"
//             value={formData.name}
//             onChange={onChangeHandler}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           />
//           <input
//             type="text"
//             name="lastname"
//             placeholder="last name"
//             value={formData.lastname}
//             onChange={onChangeHandler}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           value={formData.email}
//           onChange={onChangeHandler}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//         />
//         <input
//           type="text"
//           name="street"
//           placeholder="street"
//           value={formData.street}
//           onChange={onChangeHandler}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//         />
//         <div className="flex gap-3">
//           <input
//             type="text"
//             name="city"
//             placeholder="city"
//             value={formData.city}
//             onChange={onChangeHandler}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           />
//           <input
//             type="text"
//             name="state"
//             placeholder="state"
//             value={formData.state}
//             onChange={onChangeHandler}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           />
//         </div>
//         <div className="flex gap-3">
//           <input
//             type="text"
//             name="zipcode"
//             placeholder="zipcode"
//             value={formData.zipcode}
//             onChange={onChangeHandler}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           />
//           <input
//             type="text"
//             name="country"
//             placeholder="country"
//             value={formData.country}
//             onChange={onChangeHandler}
//             className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//           />
//         </div>
//         <input
//           type="text"
//           name="phone"
//           placeholder="phone"
//           value={formData.phone}
//           onChange={onChangeHandler}
//           className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//         />

//         {/* Additional fields for city, state, etc. */}
//       </form>

//       <div className="mt-8 min-w-80">
//         <CartTotal />
//         <Title text1="payment" text2="method" />
//         <div className="flex flex-col gap-3 lg:flex-row">
//           {paymentMethods.map(({ id, label, logo }) => (
//             <div
//               key={id}
//               onClick={() => setMethod(id)}
//               className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
//             >
//               <p
//                 className={`min-w-3.5 h-3.5 border rounded-full ${
//                   method === id ? 'bg-green-400' : ''
//                 }`}
//               ></p>
//               {logo ? (
//                 <img src={logo} className="h-5 mx-4" alt={`${label} logo`} />
//               ) : (
//                 <p className="mx-4 text-sm font-medium text-gray-500">
//                   {label}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="w-full mt-8 text-end">
//           <button
//             className="px-16 py-3 text-sm text-white bg-black"
//             type="submit"
//             onClick={handlePlaceOrder}
//           >
//             PLACE-ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;

import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  // const [discount, setDiscount] = useState(0);

  const {
    navigate,
    backendURL,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    user,
    setDiscount,
    discount,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key] || formData[key].trim() === "") {
        toast.error("Please fill in all fields");
        return false;
      }
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const paymentMethods = [
    { id: "stripe", label: "Stripe", logo: assets.stripe_logo },
    { id: "razorpay", label: "Razorpay", logo: assets.razorpay_logo },
    { id: "cod", label: "CASH ON DELIVERY" },
  ];

  // let amount = getCartAmount() + delivery_fee;
  const cartAmount = Number(getCartAmount()) || 0;
  const delivery = Number(delivery_fee) || 10;

  const originalAmount = cartAmount + delivery;
  const finalAmount = Math.max(originalAmount - discount, 0);

  let amount = Math.floor(finalAmount);

  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "order payment",
      description: "order payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendURL + "/api/order/verifyRazorpay",
            response,
            {
              headers: { token },
            },
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }
    if (!formData._id) {
      await axios.post(`${backendURL}/api/address/save`, formData, {
        headers: { token },
      });
    }
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
      if (!user) return toast.error("no user");

      let orderData = {
        userId: user._id,
        address: formData,
        items: orderItems,
        amount: Number(amount),
        paymentMethod: method,
      };

      console.log("AMOUNT SENT:", amount);

      if (method === "cod") {
        const response = await axios.post(
          `${backendURL}/api/order/placeorder`,
          orderData,
          { headers: { token } },
        );

        if (response.data.success) {
          setCartItems({});
          toast.success(response.data.message);
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else if (method === "stripe") {
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
      } else if (method === "razorpay") {
        const response = await axios.post(
          `${backendURL}/api/order/placeorderrazorpay`,
          orderData,
          { headers: { token } },
        );
        if (response.data.success) {
          initpay(response.data.order);
          // const { session_url } = response.data;
          // window.location.replace(session_url);
          // console.log(response);
          // setCartItems({});
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Please select a valid payment method.");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message || "Server error occurred");
      } else if (error.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("Failed to place order: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${backendURL}/api/address/delete`,
      { addressId: id },
      { headers: { token } },
    );

    fetchAddress();
  };

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${backendURL}/api/address/get`, {
        headers: { token },
      });
      console.log(res);
      if (res.data.success && res.data.addresses) {
        console.log(res);
        setAddresses(res.data.addresses);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplyCoupon = async () => {
    if (discount > 0) {
      toast.error("Coupon already applied");
      return;
    }
    try {
      const res = await axios.post(`${backendURL}/api/coupon/apply`, {
        code: couponCode,
        amount,
      });
      if (res.data.success) {
        setDiscount(res.data.discount);
        toast.success("Coupon applied");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      <form className="flex flex-col gap-4 w-full sm:max-w-[480px] md:max-w-[680px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {addresses?.map((addr, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedAddress(addr);
                setFormData({
                  firstName: addr.firstName || "",
                  lastName: addr.lastName || "",
                  email: addr.email || "",
                  street: addr.street || "",
                  city: addr.city || "",
                  state: addr.state || "",
                  zipcode: addr.zipcode || "",
                  country: addr.country || "",
                  phone: addr.phone || "",
                  _id: addr._id,
                });
              }}
              className={`border p-4 cursor-pointer rounded ${
                selectedAddress?._id === addr._id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-medium">
                {addr.firstName} {addr.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {addr.street}, {addr.city}
              </p>
              <p className="text-sm text-gray-600">
                {addr.state}, {addr.country}
              </p>
              <p className="text-sm">{addr.phone}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(addr._id);
                }}
                className="text-red-500 text-xs mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1="Order Summary" text2="Shopping cart" />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            name="firstName"
            placeholder="first name"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="last name"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          type="text"
          name="street"
          placeholder="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            name="city"
            placeholder="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
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
            required
            type="text"
            name="zipcode"
            placeholder="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            name="country"
            placeholder="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          placeholder="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </form>

      <div className="mt-8 min-w-80 mb-8">
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Enter coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-2 flex-1"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-black text-white px-4"
          >
            Apply
          </button>
        </div>

        <CartTotal />

        {discount > 0 && (
          <p className="text-green-600 text-sm mt-2">
            Discount Applied: ₹{discount}
          </p>
        )}
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
                  method === id ? "bg-green-400" : ""
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
