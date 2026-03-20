// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { ShopContext } from '../Context/ShopContext';
// import axios from 'axios';

// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { setToken, backendURL } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!name || !email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     try {
//       console.log('Sending data:', { name, email, password }); // Log request data for debugging

//       const response = await axios.post(
//         'http://localhost:4000/api/user/register',
//         {
//           name,
//           email,
//           password,
//         },
//       );

//       if (response.data.success) {
//         toast.success('Sign Up successful!');
//         setToken(response.data.token);
//         localStorage.setItem('token', response.data.token);
//         navigate('/');
//       } else {
//         setError(response.data.message);
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error('An error occurred. Please try again later.');
//       console.error('Axios error:', err); // Log Axios error
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="mb-6 text-2xl font-semibold text-center">Sign Up</h2>

//         {error && (
//           <div className="p-2 mb-4 text-red-600 bg-red-100 border border-red-500 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSignUp}>
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//               placeholder="Enter your name"
//             />
//           </div>

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
//             Sign Up
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-sm">
//             Already have an account?{' '}
//             <span
//               className="text-blue-500 cursor-pointer hover:underline"
//               onClick={() => navigate('/login')}
//             >
//               Sign In
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import gsap from 'gsap';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken, backendURL } = useContext(ShopContext);
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
      [circleLeftEyeRef, circleRightEyeRef, triangleLeftEyeRef, triangleRightEyeRef, squareLeftEyeRef, squareRightEyeRef].forEach((eyeRef) => {
        if (eyeRef.current) {
          const eyeRect = eyeRef.current.getBoundingClientRect();
          const eyeCenterX = eyeRect.left + eyeRect.width / 2;
          const eyeCenterY = eyeRect.top + eyeRect.height / 2;
          
          // Calculate direction from eye to mouse
          const deltaX = clientX - eyeCenterX;
          const deltaY = clientY - eyeCenterY;
          
          // Limit movement range (max 6px in any direction)
          const distance = Math.min(6, Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 0.2);
          const angle = Math.atan2(deltaY, deltaX);
          
          const moveX = Math.cos(angle) * distance;
          const moveY = Math.sin(angle) * distance;

          gsap.to(eyeRef.current, {
            x: moveX,
            y: moveY,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      console.log('Sending data:', { name, email, password }); // Log request data for debugging

      const response = await axios.post(
        'http://localhost:4000/api/user/register',
        {
          name,
          email,
          password,
        },
      );

      if (response.data.success) {
        toast.success('Sign Up successful!');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error( err.message || "unexpected error occoured" );
      console.log('Axios error:', err.message); // Log Axios error
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden "
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
              borderLeft: '60px solid transparent',
              borderRight: '60px solid transparent',
              borderBottom: '104px solid #60A5FA',
            }}
          >
            <div className="relative flex justify-center space-x-4 ml-6" style={{ top: '40px', left: '-30px' }}>
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

      {/* Sign Up Form - Right side */}
      <div className="relative z-10 w-full max-w-sm p-6 ml-auto mr-20 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl">
        <h2 className="mb-6 text-2xl font-semibold text-center">Sign Up</h2>

        {error && (
          <div className="p-2 mb-4 text-red-600 bg-red-100 border border-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;