import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimationWarper from "../Components/Animations/AnimationWrapper";

const Wishlist = () => {
  const { wishlist, backendURL, setWishlist, getWishlist } =
    useContext(ShopContext);

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${backendURL}/api/wishlist/remove/${productId}`,
        {
          headers: { token },
        },
      );
      if (res.data.success) {
        toast.success("Removed from wishlist");
        // getWishlist();
        setWishlist((prev) =>
          prev.filter((item) => item.product._id !== productId),
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing item");
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
        My Wishlist ❤️
      </h1>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">Your wishlist is empty 😢</p>
        </div>
      )}

      {/* LIST */}
      <div className="grid gap-4">
        {wishlist.map((item) => (
          <AnimationWarper key={item._id}>
            <Link
              to={`/Product/${item.product._id}`}
              className="block h-full flex flex-col"
            >
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      ₹{item.product.price}
                    </p>
                  </div>
                </div>
                {/* RIGHT */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(item.product._id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </Link>
          </AnimationWarper>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
