import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const OAuth = () => {
  const { backendURL, setToken } = useContext(ShopContext);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post(`${backendURL}/api/user/google`, {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      if (response.data.success) {
        toast.success("Google Sign In successful!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 mx-auto my-2"
    >
      Sign in with Google
    </button>
  );
};

export default OAuth;
