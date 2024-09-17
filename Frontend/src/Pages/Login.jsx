import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you want toast notifications

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [email] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Used only for Sign Up
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (isSignUp) {
      // Sign Up logic (replace with real API call)
      toast.success("Sign Up successful!");
      navigate("/dashboard");
    } else {
      // Sign In logic (replace with real API call)
      if (email === "user@example.com" && password === "password123") {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {error && (
          <div className="mb-4 p-2 text-red-600 bg-red-100 border border-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth}>
          {isSignUp && (
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
          )}

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
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
