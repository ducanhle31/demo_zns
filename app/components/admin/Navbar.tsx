"use client";
import React from "react";
import { MdHome, MdOutlinePermMedia, MdShoppingBasket } from "react-icons/md";
import { NavLink } from "react-router-dom";

const navs = [
  { label: "Trang chủ", icon: MdHome, path: "/" },
  { label: "Sản phẩm", icon: MdShoppingBasket, path: "/list-courses" },
  { label: "Media", icon: MdOutlinePermMedia, path: "/medias" },
];

export const Navbar = () => {
  return (
    <div className="flex flex-col justify-around items-start px-6 py-3 bg-white shadow-sm rounded-md space-y-4">
      {navs.map((nav, index) => (
        <NavLink to={nav.path} key={index} className="w-full">
          <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-full hover:bg-teal-100 focus:outline-none focus:ring focus:ring-teal-300 text-teal-600">
            <nav.icon className="mr-2" />
            {nav.label}
          </button>
        </NavLink>
      ))}
    </div>
  );
};
