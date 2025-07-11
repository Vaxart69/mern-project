import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function CustomerNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Header */}
      <header className="w-full h-[10vh] flex items-center justify-between bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] px-4 md:px-8 py-4 shadow text-white safe-top">
        <Link
          to="/customer/home"
          className="text-xl md:text-2xl font-bold tracking-wide hover:text-[#E8F5E9] transition-colors cursor-pointer"
        >
          Growcery
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/customer/home"
            className={`px-3 py-2 rounded-lg font-medium transition ${
              isActive("/customer/home")
                ? "bg-[#81C784] text-[#1E1E1E]"
                : "hover:bg-[#81C784] hover:text-[#1E1E1E]"
            }`}
          >
            <span>Home</span>
          </Link>
          <Link
            to="/customer/cart"
            className={`px-3 py-2 rounded-lg font-medium transition ${
              isActive("/customer/cart")
                ? "bg-[#81C784] text-[#1E1E1E]"
                : "hover:bg-[#81C784] hover:text-[#1E1E1E]"
            }`}
          >
            <span>Cart</span>
          </Link>
          <Link
            to="/customer/orders"
            className={`px-3 py-2 rounded-lg font-medium transition ${
              isActive("/customer/orders")
                ? "bg-[#81C784] text-[#1E1E1E]"
                : "hover:bg-[#81C784] hover:text-[#1E1E1E]"
            }`}
          >
            <span>Orders</span>
          </Link>
        </nav>

        {/* Desktop Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:block bg-[#81C784] hover:bg-[#A5D6A7] text-[#1E1E1E] font-semibold px-5 py-2 rounded-xl transition"
        >
          Log Out
        </button>

        {/* Mobile Logout Button */}
        <button
          onClick={handleLogout}
          className="md:hidden bg-[#81C784] hover:bg-[#A5D6A7] text-[#1E1E1E] p-2 rounded-lg transition"
          aria-label="Log Out"
        >
          <FaSignOutAlt />
        </button>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[10vh] bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] flex justify-around items-center py-3 px-4 z-50 shadow-lg safe-bottom">
        <Link
          to="/customer/home"
          className={`flex flex-col items-center ${
            isActive("/customer/home")
              ? "text-white"
              : "text-[#E8F5E9] opacity-80"
          }`}
        >
          <FaHome className="text-xl mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/customer/cart"
          className={`flex flex-col items-center ${
            isActive("/customer/cart")
              ? "text-white"
              : "text-[#E8F5E9] opacity-80"
          }`}
        >
          <FaShoppingCart className="text-xl mb-1" />
          <span className="text-xs">Cart</span>
        </Link>
        <Link
          to="/customer/orders"
          className={`flex flex-col items-center ${
            isActive("/customer/orders")
              ? "text-white"
              : "text-[#E8F5E9] opacity-80"
          }`}
        >
          <FaClipboardList className="text-xl mb-1" />
          <span className="text-xs">Orders</span>
        </Link>
      </nav>
    </>
  );
}
