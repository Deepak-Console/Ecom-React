import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import Logo from '../images/logo.png';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { name, phoneNumber } = user;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const leftHeaderMenu = [
    { id: 1, name: "Crackers", href: "/product", current: false },
  ];

  const rightHeaderMenu = [
    { id: 2, name: "Bag", href: "/checkout/cart", current: false },
    { id: 4, name: "Profile", href: "/profile", current: false },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Header Menu */}
        <div className="flex items-center">
          <div className="pr-5">
            <Link to="/home">
              <img
                className="h-16 w-auto"
                src={Logo}
                alt="Your Company"
              />
            </Link>
          </div>
          {leftHeaderMenu.map((lh) => (
            <div
              key={lh.id}
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-indigo-600"
            >
              <Link to={lh.href}>{lh.name}</Link>
            </div>
          ))}
        </div>

        {/* Right Header Menu */}
        <div className="flex items-center">
          {rightHeaderMenu.map((rh) => (
            <div
              key={rh.id}
              className="font-bold text-xs px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
            >
              <Link className="flex flex-col items-center" to={rh.href}>
                {rh.name === "Profile" ? (
                  <button
                    onClick={toggleDropdown}
                    className="relative flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 focus:outline-none"
                  >
                  {/*   <span>{name}</span> */}
                    <UserIcon className="h-6 w-6 ml-1" aria-hidden="true" />
                    {/* Optional: Notification indicator */}
                    {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span> */}
                  </button>
                ) : (
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                )}
                {/* <div className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10 ${isDropdownOpen && isAuthenticated ? 'block' : 'hidden'}`}>
                  <div className="py-1">
                    <p className="block px-4 py-2 text-sm text-gray-700">{phoneNumber}</p>
                    
                  </div>
                </div> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
