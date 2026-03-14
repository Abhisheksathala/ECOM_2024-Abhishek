import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "./../assets/assets";
import { BackendUrl } from "../App";

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
      console.log("Response:", response.data);

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
  }, [token]);

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
      console.log("Response:", response.data);

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
        {orders && orders.length > 0
          ? orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                      <img
                        src={assets.parcel_icon}
                        alt="Parcel"
                        className="w-6 h-6"
                      />
                    </div>

                    <div>
                      <h4 className="font-bold text-lg text-gray-800">
                        Order #{order._id.slice(-6)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items Section */}
                <div className="mt-6 border-t pt-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">
                    Items
                  </h5>

                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <div>
                          {item.name}{" "}
                          <span className="text-gray-400">
                            (x{item.quantity})
                          </span>
                        </div>
                        <div className="font-medium text-gray-800">
                          ₹{item.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* adress */}
                <div className="mt-6 border-t pt-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-4">
                    Shipping Address
                  </h5>

                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500 font-medium">Name</span>
                    <span className="text-gray-800">
                      {order.address?.firstName} {order.address?.lastName}
                    </span>

                    <span className="text-gray-500 font-medium">Street</span>
                    <span className="text-gray-800">
                      {order.address?.street}
                    </span>

                    <span className="text-gray-500 font-medium">City</span>
                    <span className="text-gray-800">{order.address?.city}</span>

                    <span className="text-gray-500 font-medium">State</span>
                    <span className="text-gray-800">
                      {order.address?.state}
                    </span>

                    <span className="text-gray-500 font-medium">Country</span>
                    <span className="text-gray-800">
                      {order.address?.country}
                    </span>

                    <span className="text-gray-500 font-medium">Zip Code</span>
                    <span className="text-gray-800">
                      {order.address?.zipcode}
                    </span>

                    <span className="text-gray-500 font-medium">Phone</span>
                    <span className="text-gray-800">
                      {order.address?.phone}
                    </span>

                    <span className="text-gray-500 font-medium">Email</span>
                    <span className="text-gray-800">
                      {order.address?.email}
                    </span>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-800">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Payment Status</p>
                    <p
                      className={`font-medium ${
                        order.payment ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </p>
                  </div>
                </div>

                {/* Change Status */}
                <div className="mt-6 border-t pt-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Update Status</p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => statusHandeler(e, order._id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="order placed">Order Placed</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          : "no orders "}
      </div>
    </div>
  );
};

export default Orders;
