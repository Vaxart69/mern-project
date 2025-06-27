import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/admin/Dashboard";
import UserAccounts from "./pages/admin/UserAccounts";
import ProductListings from "./pages/admin/ProductListings";
import OrderManagement from "./pages/admin/OrderManagement";
import SalesReports from "./pages/admin/SalesReports";
import AdminLayout from "./components/AdminLayout";

// define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "user-accounts", element: <UserAccounts /> },
      { path: "product-listings", element: <ProductListings /> },
      { path: "order-management", element: <OrderManagement /> },
      { path: "sales-reports", element: <SalesReports /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

// wrap in router provider to make the router available to the app
function App() {
  return <RouterProvider router={router} />;
}

export default App;
