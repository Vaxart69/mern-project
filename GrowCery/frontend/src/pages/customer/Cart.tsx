import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    productName: string;
    productType: number;
    price: number;
    productQuantity: number;
    productImage?: string;
  };
  quantity: number;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.cart || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdating(productId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchCart();
      } else {
        setMessage(data.message || "Failed to update cart");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      setMessage("Error updating cart");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        await fetchCart();
        setMessage("Item removed from cart");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCartItems([]);
        setMessage("Cart cleared");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/orders/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Order placed successfully!");
        setCartItems([]);
        setTimeout(() => {
          setMessage("");
          navigate("/customer/orders");
        }, 2000);
      } else {
        setMessage(data.message || "Failed to place order");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("Error placing order");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const getType = (type: number) => (type === 1 ? "Crops" : "Poultry");

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        return total + item.productId.price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] p-4 md:p-8">
      <div className="max-w-4xl mx-auto h-full">
        {cartItems.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Start shopping to add items to your cart"
            buttonText="Continue Shopping"
            onButtonClick={() => navigate("/customer/home")}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Shopping Cart
              </h1>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm md:text-base w-full md:w-auto"
              >
                Clear Cart
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className="mb-6 p-3 rounded-lg bg-green-100 text-green-700 text-sm md:text-base">
                {message}
              </div>
            )}

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto mb-6">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
                  >
                    {/* Item Selection Checkbox */}
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-300 rounded accent-[#43A047]"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          item.productId.productImage ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item.productId.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details and Controls */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-800 truncate">
                          {item.productId.productName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {getType(item.productId.productType)}
                        </p>
                        <p className="text-sm font-semibold text-[#FF4B2B]">
                          ₱{item.productId.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity - 1
                              )
                            }
                            disabled={updating === item.productId._id}
                            className="w-6 h-6 bg-gray-100 text-gray-600 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-black">
                            {updating === item.productId._id ? "..." : item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId._id,
                                item.quantity + 1
                              )
                            }
                            disabled={
                              updating === item.productId._id ||
                              item.quantity >= item.productId.productQuantity
                            }
                            className="w-6 h-6 bg-gray-100 text-gray-600 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-sm font-bold text-black">
                            ₱{(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.productId._id)}
                            className="text-xs text-gray-500 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Total - Fixed at bottom */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl md:text-2xl font-bold text-gray-800">
                  Total:
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#43A047]">
                  ₱{getTotalPrice()}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/customer/home")}
                  className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition text-sm md:text-base"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-[#43A047] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#388E3C] transition text-sm md:text-base"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
