import React from 'react';
import { useContext } from 'react';
import { ShopContext } from './../Context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const { searchParams, setSearchParams } = useSearchParams();

  const success = searchParams.get('success');

  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/verify`,
        { success, orderId },
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return <div></div>;
};

export default Verify;
