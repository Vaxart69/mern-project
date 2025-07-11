import { Outlet } from "react-router-dom";
import CustomerNavigation from "./CustomerNavigation";
import { useAuth } from "../hooks/useAuth";

export default function CustomerLayout() {
  // Check authentication 
  useAuth({ requiredUserType: "customer" });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="h-[10vh]">
        <CustomerNavigation />
      </header>
      <main className="h-[90vh] bg-[#F3F4F6] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
