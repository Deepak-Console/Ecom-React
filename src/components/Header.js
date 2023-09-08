import React from "react";
import { Link } from "react-router-dom";

import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const leftHeaderMenu = [
  { name: "Women", href: "/product/women", current: false },
  { name: "Men", href: "/product/men", current: false },
];

const rightHeaderMenu = [
  { name: "Profile", href: "/profile", current: false },
  { name: "Wishlist", href: "/wishlist", current: false },
  { name: "Bag", href: "/checkout/cart", current: false },
];

const Header = () => {
  return (
    <div className="space-x-4 w-full flex h-16 items-center justify-between fixed top-0 shadow-lg">
      <div className="flex items-center ml-8">
        <div className="px-5">
          <Link to="/home">
            <img
              className="h-8  w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </Link>
        </div>

        {leftHeaderMenu.map((lh) => (
          <div className=" block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <Link to={lh.href}>{lh.name}</Link>
          </div>
        ))}
      </div>
      <div className="flex items-center !mr-16">
        {rightHeaderMenu.map((rh) => (
          <div className="font-bold text-xs px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            <Link className="flex flex-col items-center" to={rh.href}>
              <UserIcon className="h-6 w-6" aria-hidden="true" />
              <div className="text-center">{rh.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
