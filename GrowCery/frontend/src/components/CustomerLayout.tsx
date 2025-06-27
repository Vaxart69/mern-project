import { Outlet } from "react-router-dom";
import CustomerNavigation from "./CustomerNavigation";
import { useAuth } from "../hooks/useAuth";

export default function CustomerLayout() {
  // Check authentication for customer users
  useAuth({ requiredUserType: "customer" });

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerNavigation />
      <main className="flex-1 bg-[#F3F4F6]">
        <Outlet />
      </main>
    </div>
  );
}
