import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Siderbar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 ">
      <div className="flex flex-col gap-4 pt- pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/add"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/list"
        >
          <img src={assets.List_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/order"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">order Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Siderbar;
