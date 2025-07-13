import { Outlet } from "react-router-dom";
import CustomerNavigation from "./CustomerNavigation";
import { useAuth } from "../hooks/useAuth";

export default function CustomerLayout() {
  useAuth({ requiredUserType: "customer" });

  return (
    // make the navigation fixed at the top and the main content scrollable
    <div className="flex flex-col h-screen overflow-hidden">
      <CustomerNavigation />

      {/* make the main content scrollable */}
      <main className="flex-1 bg-[#F3F4F6] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
