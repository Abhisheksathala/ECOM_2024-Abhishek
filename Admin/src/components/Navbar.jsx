import React from "react";
import { assets } from "./../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center px-[4%] py-2 justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button className="bg-gray-500 text-white px-5 py-2 sm:px-7 sm:py-2  rounded-full">
        Logout
      </button>
    </div>
  );
};

export default Navbar;