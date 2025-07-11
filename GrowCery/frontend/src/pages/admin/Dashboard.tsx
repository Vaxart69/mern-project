import { useEffect, useState } from "react";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();

    const handleOrderStatusUpdate = () => {
      fetchDashboardStats();
    };

    window.addEventListener("orderStatusUpdated", handleOrderStatusUpdate);

    return () => {
      window.removeEventListener("orderStatusUpdated", handleOrderStatusUpdate);
    };
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const [productsResponse, ordersResponse, usersResponse] =
        await Promise.all([
          fetch("http://localhost:3000/products"),
          fetch("http://localhost:3000/orders/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:3000/users/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      const [productsData, ordersData, usersData] = await Promise.all([
        productsResponse.json(),
        ordersResponse.json(),
        usersResponse.json(),
      ]);

      const revenue =
        ordersData.orders
          ?.filter((order: any) => order.orderStatus === 1)
          .reduce(
            (total: number, order: any) => total + (order.totalAmount || 0),
            0
          ) || 0;

      setStats({
        totalUsers: usersData.users?.length || 0,
        totalProducts: productsData.products?.length || 0,
        totalOrders: ordersData.orders?.length || 0,
        revenue: revenue,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Welcome to the admin dashboard. Here you can manage products, orders,
          and users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-gray-500 text-sm mb-1 font-medium">
            TOTAL USERS
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {stats.totalUsers}
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-gray-500 text-sm mb-1 font-medium">
            TOTAL PRODUCTS
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {stats.totalProducts}
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-gray-500 text-sm mb-1 font-medium">
            TOTAL ORDERS
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {stats.totalOrders}
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-gray-500 text-sm mb-1 font-medium">REVENUE</div>
          <div className="text-3xl font-bold text-gray-800">
            ₱{stats.revenue.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
