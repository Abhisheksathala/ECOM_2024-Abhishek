import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from './../assets/assets';
import { BackendUrl } from '../App';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${BackendUrl}/api/order/list`,
        {},
        {
          headers: { token },
        },
      );
      console.log('Response:', response.data);

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandeler = async (event, orderId) => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${BackendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        {
          headers: { token },
        },
      );
      console.log('Response:', response.data);

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h3 className="mb-4 text-2xl font-bold text-center">Your Orders</h3>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-10 h-10 mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold">Order #{order._id}</h4>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h5 className="mb-2 font-semibold text-gray-700">Items:</h5>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-3"
                >
                  <div>
                    <p className="text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-700">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h5 className="mb-2 font-semibold text-gray-700">
                Order Status:
              </h5>
              <p className="text-gray-800">{order.status}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h5 className="mb-2 font-semibold text-gray-700">
                Payment Method:
              </h5>
              <p className="text-gray-800">{order.paymentMethod}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h5 className="mb-2 font-semibold text-gray-700">
                Payment Status:
              </h5>
              <p className="text-gray-800">
                {order.payment ? 'Done' : 'Pending'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h5 className="mb-2 font-semibold text-gray-700">Date:</h5>
              <p className="text-gray-800">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <select
              onChange={(e) => statusHandeler(e, order._id)}
              name=""
              id=""
            >
              <option value="order placed">order placed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">shipped</option>
              <option value="Cancelled">out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
