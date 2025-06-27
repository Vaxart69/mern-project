import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <header className="w-full flex items-center justify-between bg-gradient-to-r from-[#7C3AED] to-[#6200EE] px-8 py-4 shadow text-white">
        <div className="text-2xl font-bold tracking-wide">Growcery Admin</div>
        <button
          onClick={handleLogout}
          className="bg-[#A78BFA] hover:bg-[#C4B5FD] text-[#1E1E1E] font-semibold px-5 py-2 rounded-xl transition"
        >
          Log Out
        </button>
      </header>
      
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 bg-[#F3F4F6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
