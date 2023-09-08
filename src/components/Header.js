import React from "react";
import { Link } from "react-router-dom";

import { HeartIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '/home', current: true },
    { name: 'Women', href: '/product/women', current: false },
    { name: 'Man', href: '/product/man', current: false },
]

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

                {navigation.map((item) => (
                    <div className=" block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        <Link to={item.href}>{item.name}</Link>
                    </div>
                ))}
            </div>
            <div className="flex items-center !mr-16">
                <div className="font-bold text-xs px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <Link className="flex flex-col items-center" to="/notification">
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                        <div className="text-center">Profile</div>
                    </Link>
                </div>
                <div className="text-xs font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <Link className="flex flex-col items-center" to="/wishlist">
                        <HeartIcon className="h-6 w-6" aria-hidden="true" />
                        <div className="text-center">Wishlist</div>
                    </Link>
                </div>
                <div className="text-xs font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <Link className="flex flex-col items-center" to="/checkout/cart">
                        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                        <div className="text-center">Wishlist</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;