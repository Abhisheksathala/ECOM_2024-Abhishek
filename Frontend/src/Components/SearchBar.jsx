import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();

  useEffect(() => {
    console.log("Current Path:", location.pathname); // Debug log
    // Check for the correct path including the leading slash
    if (location.pathname === "/collection") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location, setShowSearch]);

  return showSearch ? (
    <div className="bg-gray-50 border-t border-b py-4 flex justify-center">
      <div className="flex items-center w-3/4 md:w-2/3 lg:w-1/2 bg-white rounded-full shadow-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none  px-4 py-2 rounded-l-full border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowSearch(false)}
          className="flex h-[100%] items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-r-full hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          <img src={assets.cross_icon} alt="Close search" className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
