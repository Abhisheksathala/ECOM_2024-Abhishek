import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BackendUrl } from '../App';

const Listing = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/product/list`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setList(response.data.products);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeproduct = async (id) => {
    try {
      const response = await axios.post(`${BackendUrl}/api/product/remove`, {
        headers: { token },
        data: { id },
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      fetchList();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="mb-8 text-4xl font-semibold text-center text-green-600">
        All Product Listings
      </h1>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 border-b bg-gray-200 text-sm font-semibold">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Actions</span>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {list.map((product, index) => (
          <div
            key={index}
            className="grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="flex items-center justify-center md:block">
              <img
                src={product.image[0]}
                alt={product.name}
                className="object-cover w-16 h-16 rounded-lg md:w-20 md:h-20"
              />
            </div>

            {/* Product Name */}
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                {product.name}
              </h2>
            </div>

            {/* Category */}
            <div className="text-center text-gray-700">
              <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="font-semibold text-center text-gray-700">
              ${product.price}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => removeproduct(product._id)}
                className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;
