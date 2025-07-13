import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";

// define a construct of order item
interface OrderItem {
  productId: {
    _id: string;
    productName: string;
    productType: number;
    price: number;
    productImage?: string;
  };
  quantity: number;
  price: number;
}

// define a construct of the order itself
interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: number; // 0 = Pending, 1 = Approved, 2 = Completed, 3 = Canceled
  dateOrdered: string;
  time: string;
}

export default function Orders() {
  const navigate = useNavigate();
  // initialize an empty array for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders(); // get the orders when the component moounts
  }, []);

  // this is the function to fetch the orders from the API
  const fetchOrders = async () => {
    try {
      // validate the token of the user (stored in the local)
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // make a get request to the orders endpoint
      // the token is passed first in the headers to the auth middle for validation
      // before going to the main controller
      const response = await fetch("http://localhost:3000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  // get the status text based on the status code
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Completed";
      case 3:
        return "Canceled";
      default:
        return "Unknown";
    }
  };

  // setting status color
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

  // get the type of product based on the type code
  const getType = (type: number) => (type === 1 ? "Crops" : "Poultry");

  // format the date from the database
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* run the empty state component if there are no orders */}
        {orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="When you place orders, they will appear here"
            buttonText="Start Shopping"
            onButtonClick={() => navigate("/customer/home")}
          />
        ) : (
          // the main card for the orders
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                My Orders
              </h1>
              <button
                onClick={() => navigate("/customer/home")}
                className="bg-[#43A047] text-white px-4 py-2 rounded-lg hover:bg-[#388E3C] transition text-sm"
              >
                Continue Shopping
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 text-gray-900 text-sm">
                {error}
              </div>
            )}

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-3 md:p-4"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {formatDate(order.dateOrdered)} at {order.time}
                      </p>
                    </div>
                    <div className="sm:text-right w-full sm:w-auto">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {getStatusText(order.orderStatus)}
                      </span>
                      <p className="text-base font-bold text-[#222] mt-1">
                        ₱{order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 border-b pb-1">
                      Items Ordered:
                    </h4>
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={
                            item.productId.productImage ||
                            "https://via.placeholder.com/60"
                          }
                          alt={item.productId.productName}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm text-gray-800 truncate">
                            {item.productId.productName}
                          </h5>
                          <p className="text-xs text-gray-600">
                            {getType(item.productId.productType)}
                          </p>
                          <p className="text-xs text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-medium text-gray-800">
                            ₱{item.price.toFixed(2)} x {item.quantity}
                          </p>
                          <p className="text-xs font-bold text-[#222]">
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
