import { useNavigate, Link, useLocation } from "react-router-dom";

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
    <header className="w-full flex items-center justify-between bg-gradient-to-r from-[#7C3AED] to-[#6200EE] px-8 py-4 shadow text-white">
      <div className="text-2xl font-bold tracking-wide">Growcery</div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link
          to="/customer/home"
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isActive("/customer/home")
              ? "bg-[#A78BFA] text-[#1E1E1E]"
              : "hover:bg-[#A78BFA] hover:text-[#1E1E1E]"
          }`}
        >
          Home
        </Link>
        <Link
          to="/customer/cart"
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isActive("/customer/cart")
              ? "bg-[#A78BFA] text-[#1E1E1E]"
              : "hover:bg-[#A78BFA] hover:text-[#1E1E1E]"
          }`}
        >
          Cart
        </Link>
        <Link
          to="/customer/about-us"
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isActive("/customer/about-us")
              ? "bg-[#A78BFA] text-[#1E1E1E]"
              : "hover:bg-[#A78BFA] hover:text-[#1E1E1E]"
          }`}
        >
          About Us
        </Link>
        <Link
          to="/customer/orders"
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isActive("/customer/orders")
              ? "bg-[#A78BFA] text-[#1E1E1E]"
              : "hover:bg-[#A78BFA] hover:text-[#1E1E1E]"
          }`}
        >
          Orders
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="bg-[#A78BFA] hover:bg-[#C4B5FD] text-[#1E1E1E] font-semibold px-5 py-2 rounded-xl transition"
      >
        Log Out
      </button>
    </header>
  );
}
