import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

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
    path: "*",
    element: <Navigate to="/login" replace />,
  },
  
]);

// wrap in router provider to make the router available to the app
function App() {
  return <RouterProvider router={router} />;
}

export default App;
