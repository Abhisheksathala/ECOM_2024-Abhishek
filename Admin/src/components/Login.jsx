import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BackendUrl } from '../App';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setError(null);
      }

      if (!response.data.success) {
        toast.error(response.data.message);
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="w-full px-4 py-2 mt-2 text-white bg-black rounded-md"
            type="submit"
          >
            {' '}
            Login{' '}
          </button>
        </form>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
