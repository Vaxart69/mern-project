import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="min-h-screen w-64 bg-gradient-to-b from-[#7C3AED] to-[#6200EE] text-white flex flex-col shadow-lg">
      <nav className="flex-1 flex flex-col gap-2 mt-8">
        <Link
          to="/admin/dashboard"
          className={`px-6 py-3 rounded-l-full font-medium transition-colors ${
            isActive("/admin/dashboard")
              ? "bg-[#A78BFA] text-[#1E1E1E] shadow"
              : "hover:bg-[#C4B5FD] hover:text-[#1E1E1E]"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/user-accounts"
          className={`px-6 py-3 rounded-l-full font-medium transition-colors ${
            isActive("/admin/user-accounts")
              ? "bg-[#A78BFA] text-[#1E1E1E] shadow"
              : "hover:bg-[#C4B5FD] hover:text-[#1E1E1E]"
          }`}
        >
          User Accounts
        </Link>
        <Link
          to="/admin/product-listings"
          className={`px-6 py-3 rounded-l-full font-medium transition-colors ${
            isActive("/admin/product-listings")
              ? "bg-[#A78BFA] text-[#1E1E1E] shadow"
              : "hover:bg-[#C4B5FD] hover:text-[#1E1E1E]"
          }`}
        >
          Product Listings
        </Link>
        <Link
          to="/admin/order-management"
          className={`px-6 py-3 rounded-l-full font-medium transition-colors ${
            isActive("/admin/order-management")
              ? "bg-[#A78BFA] text-[#1E1E1E] shadow"
              : "hover:bg-[#C4B5FD] hover:text-[#1E1E1E]"
          }`}
        >
          Order Management
        </Link>
        <Link
          to="/admin/sales-reports"
          className={`px-6 py-3 rounded-l-full font-medium transition-colors ${
            isActive("/admin/sales-reports")
              ? "bg-[#A78BFA] text-[#1E1E1E] shadow"
              : "hover:bg-[#C4B5FD] hover:text-[#1E1E1E]"
          }`}
        >
          Sales Reports
        </Link>
      </nav>
    </aside>
  );
}
