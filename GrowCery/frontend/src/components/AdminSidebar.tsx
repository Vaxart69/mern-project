import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="min-h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
      <nav className="flex-1 flex flex-col gap-1 mt-8 px-4">
        <Link
          to="/admin/dashboard"
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive("/admin/dashboard")
              ? "bg-gray-800 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/user-accounts"
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive("/admin/user-accounts")
              ? "bg-gray-800 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          User Accounts
        </Link>
        <Link
          to="/admin/product-listings"
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive("/admin/product-listings")
              ? "bg-gray-800 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Product Listings
        </Link>
        <Link
          to="/admin/order-management"
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive("/admin/order-management")
              ? "bg-gray-800 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Order Management
        </Link>
        <Link
          to="/admin/sales-reports"
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            isActive("/admin/sales-reports")
              ? "bg-gray-800 text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Sales Reports
        </Link>
      </nav>
    </aside>
  );
}
