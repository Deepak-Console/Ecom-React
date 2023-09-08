import React, { lazy, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import ReactDOM from "react-dom/client";

const Header = lazy(() => import("./components/Header"));
const ProductView = lazy(() => import("./components/ProductView"));

import {
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/product/men",
        element: <ProductView />,
      },
      {
        path: "/product/women",
        element: <ProductView />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
