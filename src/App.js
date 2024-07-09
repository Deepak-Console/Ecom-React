import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./appStore/appstore"; // Import your Redux store
import ErrorBoundary from "./utils/ErrorBoundary";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import Header from "./components/Header";
import CrackerShop from "./components/CrackerShop";
import ProductView from "./components/ProductView";
import CartPage from "./components/Cart-1";

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
    element: <ErrorBoundary><AppLayout /></ErrorBoundary>,
    children: [
    /*   {
        path: "/product/men",
        element: <ProductView />,
      },
      {
        path: "/product/women",
        element: <ProductView />,
      }, 
      {
        path: "/product/crackers",
        element: <ErrorBoundary><CrackerShop /></ErrorBoundary>,
      },*/
      {
        path: "/home",
        element: <ErrorBoundary><CrackerShop /></ErrorBoundary>,
      },
      {
        path: "/checkout/cart",
        element: <CartPage />,
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
); 





