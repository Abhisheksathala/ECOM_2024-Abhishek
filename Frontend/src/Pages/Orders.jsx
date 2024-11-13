import { ShopContext } from '../Context/ShopContext';
import { useContext, useState, useEffect } from 'react';
import Title from '../Components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { currency, token, backendURL } = useContext(ShopContext);
  const [order, setOrder] = useState([]);

  console.log('Order:', order);

  const loadOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendURL}/api/order/userorders`,
        {}, // include an empty object if necessary
        {
          headers: {
            token,
          },
        },
      );
      console.log('orders respons ' + response.data);

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          })),
        );

        console.log('allOrdersItem ' + allOrdersItem);

        setOrder(allOrdersItem);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      {/* Orders Title */}
      <div className="mb-8 text-center">
        <Title text1="Orders" text2="History" />
      </div>

      {/* Order Items */}
      <div className="space-y-6">
        {order.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-lg lg:flex-row"
          >
            {/* Product Image and Info */}
            <div className="flex items-center">
              <img
                src={item.image[0]}
                alt={item.name}
                className="object-cover w-20 h-20 rounded-lg"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {currency}
                  {item.price}
                </p>
              </div>
            </div>

            {/* Quantity and Size */}
            <div className="flex flex-col items-center mt-4 lg:items-start lg:mt-0">
              <h3 className="text-sm text-gray-600">
                <span className="font-medium">Quantity: </span>
                {item.quantity}
              </h3>
              <h3 className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Size: </span>
                {item.sizes}
              </h3>
            </div>

            {/* Date */}
            <div className="flex flex-col items-center mt-4 lg:items-end lg:mt-0">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Date: </span>
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>

            {/* Order Status */}
            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <div className="h-2 bg-green-500 rounded-full min-w-2"></div>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={() => {
                  loadOrders;
                }}
                className="px-4 py-2 text-sm font-medium border rounded-sm"
              >
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
