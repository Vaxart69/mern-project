import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const navigate = useNavigate();

  useAuth({ requiredUserType: "admin" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-full flex items-center justify-between bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
        <div className="text-2xl font-bold tracking-wide text-gray-800">
          Growcery Admin
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          Log Out
        </button>
      </header>

      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
