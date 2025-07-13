import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productType: number;
  productQuantity: number;
  price: number;
  productImage?: string;
}

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:3000/product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProduct(data.product);
          }
        })
        .catch((error) => console.error("Error fetching product:", error))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Item added to cart successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      console.log("Detailed error object:", error); // <-- Added for debugging
      setMessage("Error adding item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  const getType = (type: number) => (type === 1 ? "Crops" : "Poultry");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] p-4 md:p-8">
      {/* Modal notification - overlay style */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-60 rounded-lg p-4 flex items-center shadow-lg">
            <div className="bg-[#43A047] rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-white">{message}</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative">
        {/* Top section: Image + Main Details */}
        <div className="flex flex-col md:flex-row">
          {/* Product Image - With better margins */}
          <div className="md:w-1/2 p-6 flex items-center justify-center">
            <img
              src={product.productImage || "https://via.placeholder.com/400"}
              alt={product.productName}
              className="w-full max-w-md h-auto object-contain rounded-lg"
            />
          </div>

          {/* Product Main Details */}
          <div className="p-4 md:p-8 md:w-1/2 flex flex-col">
            <div className="mb-4">
              <span className="text-sm text-[#43A047] font-medium">
                {getType(product.productType)}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                {product.productName}
              </h1>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="text-2xl md:text-3xl font-bold text-[#43A047]">
                ₱{product.price}
              </span>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="text-sm md:text-base text-gray-700">
                {product.productQuantity} left
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4 md:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 md:w-10 md:h-10 bg-[#43A047] text-white rounded-lg flex items-center justify-center hover:bg-[#388E3C] transition"
                >
                  -
                </button>
                <span className="w-8 md:w-12 text-center font-medium text-black">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.productQuantity, quantity + 1))
                  }
                  className="w-8 h-8 md:w-10 md:h-10 bg-[#43A047] text-white rounded-lg flex items-center justify-center hover:bg-[#388E3C] transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || product.productQuantity === 0}
              className="w-full bg-[#43A047] text-white py-2 md:py-3 px-6 rounded-lg font-medium hover:bg-[#2E7D32] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Description section */}
        <div className="px-6 py-4 md:px-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Description
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            {product.productDescription}
          </p>

          {/* Back Button */}
          <button
            onClick={() => navigate("/customer/home")}
            className="w-full md:w-auto bg-gray-200 text-gray-800 py-2 md:py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
