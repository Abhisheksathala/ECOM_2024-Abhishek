// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { ShopContext } from '../Context/ShopContext';
// import axios from 'axios';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { setToken, backendURL } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await axios.post(`${backendURL}/api/user/login`, {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         toast.success('Sign In successful!');
//         setToken(response.data.token);
//         localStorage.setItem('token', response.data.token);
//         navigate('/');
//       } else {
//         setError(response.data.message);
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error('An error occurred. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>

//         {error && (
//           <div className="p-2 mb-4 text-red-600 bg-red-100 border border-red-500 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSignIn}>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-sm">
//             Don't have an account?{' '}
//             <span
//               className="text-blue-500 cursor-pointer hover:underline"
//               onClick={() => navigate('/signup')}
//             >
//               Sign Up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import gsap from "gsap";
import RotatingImage from "../libs/Roataingimage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken, backendURL, setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  // Refs for shapes
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const triangleRef = useRef(null);
  const squareRef = useRef(null);

  // Refs for eyes inside shapes
  const circleLeftEyeRef = useRef(null);
  const circleRightEyeRef = useRef(null);
  const triangleLeftEyeRef = useRef(null);
  const triangleRightEyeRef = useRef(null);
  const squareLeftEyeRef = useRef(null);
  const squareRightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const containerRect = containerRef.current.getBoundingClientRect();

      // Move eyes for each shape
      [
        circleLeftEyeRef,
        circleRightEyeRef,
        triangleLeftEyeRef,
        triangleRightEyeRef,
        squareLeftEyeRef,
        squareRightEyeRef,
      ].forEach((eyeRef) => {
        if (eyeRef.current) {
          const eyeRect = eyeRef.current.getBoundingClientRect();
          const eyeCenterX = eyeRect.left + eyeRect.width / 2;
          const eyeCenterY = eyeRect.top + eyeRect.height / 2;

          // Calculate direction from eye to mouse
          const deltaX = clientX - eyeCenterX;
          const deltaY = clientY - eyeCenterY;

          // Limit movement range (max 6px in any direction)
          const distance = Math.min(
            6,
            Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 0.2,
          );
          const angle = Math.atan2(deltaY, deltaX);

          const moveX = Math.cos(angle) * distance;
          const moveY = Math.sin(angle) * distance;

          gsap.to(eyeRef.current, {
            x: moveX,
            y: moveY,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Sign In successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Left side shapes with eyes */}
      <div className="absolute left-0 w-1/2 h-full">
        {/* Circle */}
        <div
          ref={circleRef}
          className="absolute w-32 h-32 bg-yellow-300 rounded-full shadow-xl top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex justify-center space-x-4 top-1/3">
            <div
              ref={circleLeftEyeRef}
              className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div
              ref={circleRightEyeRef}
              className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Triangle */}
        <div
          ref={triangleRef}
          className="absolute w-32 h-32 top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "60px solid transparent",
              borderRight: "60px solid transparent",
              borderBottom: "104px solid #60A5FA",
            }}
          >
            <div
              className="relative flex items-center justify-center space-x-4 ml-5"
              style={{ top: "40px", left: "-30px" }}
            >
              <div
                ref={triangleLeftEyeRef}
                className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div
                ref={triangleRightEyeRef}
                className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Square */}
        <div
          ref={squareRef}
          className="absolute w-32 h-32 bg-green-400 rounded-lg shadow-xl top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex justify-center space-x-4 top-1/3">
            <div
              ref={squareLeftEyeRef}
              className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div
              ref={squareRightEyeRef}
              className="w-4 h-4 bg-white rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center relative w-full h-full">
        <div className="absolute -top-32   right-36">
          <RotatingImage />
        </div>
        <div className="relative z-10 w-full max-w-sm p-6 ml-auto mx-auto  sm:mr-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.tzuqB2w0wG66B9dujz3hfAHaHa?pid=Api&P=0&h=180"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>

          {error && (
            <div className="p-2 mb-4 text-red-600 bg-red-100 border border-red-500 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
