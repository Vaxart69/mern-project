import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/signin";
import Dashboard from "./pages/admin/Dashboard";
import UserAccounts from "./pages/admin/UserAccounts";
import ProductListings from "./pages/admin/ProductListings";
import OrderManagement from "./pages/admin/OrderManagement";
import AdminLayout from "./components/AdminLayout";
import CustomerLayout from "./components/CustomerLayout";
import Home from "./pages/customer/Home";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import ProductDetail from "./pages/customer/ProductDetail";
import LandingPage from "./pages/landingpage";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/landing" replace />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  // {
  //   path: "/signup",
  //   element: <SignUp />,
  // },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "user-accounts", element: <UserAccounts /> },
      { path: "product-listings", element: <ProductListings /> },
      { path: "order-management", element: <OrderManagement /> },
    ],
  },
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "product/:productId", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "orders", element: <Orders /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

// wrap in router provider to make the router available to the app
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []); 

  return <RouterProvider router={router} />;
}

export default App;
