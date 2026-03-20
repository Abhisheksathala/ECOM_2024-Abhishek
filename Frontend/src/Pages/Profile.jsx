import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const Profile = () => {
  const { backendURL, setUser, user } = useContext(ShopContext);

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${backendURL}/api/user/profile`, {
        headers: { token },
      });

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      getUserProfile();
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">No user data</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      <div className="space-y-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user._id}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(user.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
