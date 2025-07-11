import { useEffect, useState } from "react";

interface OrderItem {
  productId: {
    _id: string;
    productName: string;
    price: number;
  } | null;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: number;
  dateOrdered: string;
  time: string;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      setError("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );

      const data = await response.json();
      if (data.success) {
        await fetchOrders();
        // Trigger a custom event to notify other components about order status change
        window.dispatchEvent(new CustomEvent('orderStatusUpdated'));
      } else {
        setError(data.message || "Failed to update order status");
      }
    } catch (error) {
      setError("Error updating order status");
    }
  };


  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-green-100 text-green-800";
      case 3:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start min-h-screen p-8 bg-white">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-black">Order Management</h1>
          <p className="text-lg font-medium text-gray-700">
            Manage and track customer orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          title="Refresh Orders"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582M20 20v-5h-.581m-1.837 2.163A7.962 7.962 0 0112 20c-4.418 0-8-3.582-8-8m16 0c0-1.657-.672-3.157-1.763-4.237M15.418 5.837A7.962 7.962 0 0012 4c-1.657 0-3.157.672-4.237 1.763"
            />
          </svg>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="w-full mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError("")}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats */}
      {orders.length > 0 && (
        <div className="w-full mb-8 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <div className="text-sm text-black">Pending Orders</div>
            <div className="text-2xl font-bold text-black">
              {orders.filter((order) => order.orderStatus === 0).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="text-sm text-black">Approved Orders</div>
            <div className="text-2xl font-bold text-black">
              {orders.filter((order) => order.orderStatus === 1).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="text-sm text-black">Completed Orders</div>
            <div className="text-2xl font-bold text-black">
              {orders.filter((order) => order.orderStatus === 2).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <div className="text-sm text-black">Canceled Orders</div>
            <div className="text-2xl font-bold text-black">
              {orders.filter((order) => order.orderStatus === 3).length}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Items
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  #{order._id.slice(-8).toUpperCase()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.userId ? (
                    <div>
                      <div className="font-medium">
                        {order.userId.firstName} {order.userId.lastName}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {order.userId.email}
                      </div>
                    </div>
                  ) : (
                    <div className="font-medium text-red-500">
                      Unknown Customer
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="text-xs">
                        {item.productId?.productName || "Unknown Product"}{" "}
                        (x
                        {item.quantity})
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{order.items.length - 2} more items
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  ₱{(order.totalAmount || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <select
                    value={order.orderStatus || 0}
                    onChange={(e) =>
                      updateOrderStatus(order._id, parseInt(e.target.value))
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(
                      order.orderStatus || 0
                    )}`}
                  >
                    <option value={0}>Pending</option>
                    <option value={1}>Approved</option>
                    <option value={2}>Completed</option>
                    <option value={3}>Canceled</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <div>{formatDate(order.dateOrdered)}</div>
                    <div className="text-xs text-gray-500">
                      {order.time || "N/A"}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
