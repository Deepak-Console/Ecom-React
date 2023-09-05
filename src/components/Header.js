import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { HeartIcon, ShoppingBagIcon, ShoppingCartIcon, FaceFrownIcon, FaceSmileIcon, BellIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '/home', current: true },
    { name: 'Women', href: '/product/women', current: false },
    { name: 'Man', href: '/product/man', current: false },

]

const Header = () => {

    return (

        <div className="space-x-4 w-full flex h-16 items-center justify-between fixed top-0  shadow-lg">
            <div className="flex items-center">

                <div className="ml-8 px-5">
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
            <div className="flex items-center">

               {/*  <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <Link to="/checkout/cart"> <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></Link>
                </div> */}

                <div className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <Link to="/notification"><svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </Link>

                </div>

                <div className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <Link to="/notification"><BellIcon className="h-6 w-6" aria-hidden="true" /></Link>

                </div>
                <div className="flex flex-wrap font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <div><Link to="/wishlist"><HeartIcon className="h-6 w-6" aria-hidden="true" /></Link></div>
                    {/*   <div>wishlist</div> */}
                </div>

                <div className="mr-8 font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                    <Link to="/checkout/cart"><ShoppingBagIcon className="h-6 w-6" aria-hidden="true" /></Link>
                </div>




            </div>

        </div>

    )
}

export default Header;