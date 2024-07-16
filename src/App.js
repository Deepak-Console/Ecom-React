import React from "react";
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
import CartPage from "./components/Cart";
import Login from "./components/Login";
import Home from "./components/Home";
import AddressCollection from "./components/AddressCollection";
import Profile from "./components/Profile";
import Order from "./components/Order";
import OrderDetailsPage from './components/OrderDetailsPage';
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

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
      {
        path: "/home",
        element: <ErrorBoundary><Home /></ErrorBoundary>,
      },
      {
        path: "/profile",
        element: <ErrorBoundary><PrivateRoute element={<Profile />} /></ErrorBoundary>,
      },
      {
        path: "/address",
        element: <ErrorBoundary><PrivateRoute element={<AddressCollection />} /></ErrorBoundary>,
      },
      {
        path: "/login",
        element: <ErrorBoundary><Login /></ErrorBoundary>,
      },
      {
        path: "/product",
        element: <ErrorBoundary><CrackerShop /></ErrorBoundary>,
      },
      {
        path: "/orders",
        element: <ErrorBoundary><PrivateRoute element={<Order />} /></ErrorBoundary>,
      },
      {
        path: "/orders/:id", // Route parameter ":id" to capture order ID
        element: <ErrorBoundary><PrivateRoute element={<OrderDetailsPage />} /></ErrorBoundary>,
      },
      {
        path: "/checkout/cart",
        element: <ErrorBoundary><PrivateRoute element={<CartPage />} /></ErrorBoundary>,
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
