import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";

import { HeartIcon, ShoppingBagIcon, ShoppingCartIcon, FaceFrownIcon, FaceSmileIcon, BellIcon } from '@heroicons/react/24/outline'


const AppLayout = () => {
    return (
        <>
            <Header />
        </>
    )
}



const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [

        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

