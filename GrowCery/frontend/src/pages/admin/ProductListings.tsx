import { useEffect, useState } from "react";

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productType: number;
  productQuantity: number;
  price: number;
  productImage?: string;
}

interface FormData {
  productImageURL: string;
  productName: string;
  productDescription: string;
  productType: string;
  quantity: string;
  price: string;
}

export default function ProductListings() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    productImageURL: "",
    productName: "",
    productDescription: "",
    productType: "1",
    quantity: "",
    price: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      productImageURL: "",
      productName: "",
      productDescription: "",
      productType: "1",
      quantity: "",
      price: "",
    });
    setError("");
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      productImageURL: product.productImage || "",
      productName: product.productName,
      productDescription: product.productDescription,
      productType: product.productType.toString(),
      quantity: product.productQuantity.toString(),
      price: product.price.toString(),
    });
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const productData = {
        productName: formData.productName,
        productDescription: formData.productDescription,
        productType: parseInt(formData.productType),
        productQuantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        productImage: formData.productImageURL,
      };

      const url = editingProduct
        ? `http://localhost:3000/products/${editingProduct._id}`
        : "http://localhost:3000/create-product";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${editingProduct ? "update" : "create"} product`
        );
      }

      await fetchProducts();
      handleCloseModal();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${editingProduct ? "update" : "create"} product`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderProductActions = (product: Product) => (
    <button
      onClick={() => handleEditProduct(product)}
      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs flex items-center gap-1"
      title="Edit Product"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      Edit
    </button>
  );

  const tableHeaders = [
    "ID",
    "Name",
    "Type",
    "Quantity",
    "Price",
    "Description",
    "Actions",
  ];

  const renderFormField = (
    label: string,
    name: string,
    type: string = "text",
    placeholder: string = "",
    required: boolean = false,
    rows?: number
  ) => (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        {label}
      </label>
      {name === "productDescription" ? (
        <textarea
          name={name}
          value={formData[name as keyof FormData]}
          onChange={handleInputChange}
          rows={rows || 3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-400"
          placeholder={placeholder}
        />
      ) : name === "productType" ? (
        <select
          name={name}
          value={formData[name as keyof FormData]}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
        >
          <option value="1">Crops</option>
          <option value="2">Poultry</option>
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name as keyof FormData]}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black placeholder:text-gray-400"
          placeholder={placeholder}
          required={required}
          min={type === "number" ? "0" : undefined}
          step={name === "price" ? "0.01" : undefined}
        />
      )}
    </div>
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full p-8 bg-gray-50">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">
            Product Listings
          </h1>
          <p className="text-gray-700 text-lg">
            Manage and update product inventory
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          + Add Product
        </button>
      </div>

      {/* Search Bar Section */}
      <div className="w-full bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-center gap-4 shadow-sm">
        <div className="w-full max-w-md flex items-center bg-gray-50 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none text-gray-700 bg-transparent"
          />
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Type:</span>
          <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 outline-none">
            <option>All Types</option>
            <option>Crops</option>
            <option>Poultry</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Sort:</span>
          <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 outline-none">
            <option>A-Z</option>
            <option>Z-A</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full">
        {loading ? (
          <div className="p-8 text-center">
            <span className="text-gray-500 text-xl">Loading...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-xl text-gray-400 font-medium">
              No products yet. Please add one.
            </span>
          </div>
        ) : (
          <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold text-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      #{product._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {product.productType === 1 ? "Crops" : "Poultry"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {product.productQuantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      ₱{product.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {product.productDescription}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {renderProductActions(product)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {renderFormField(
                "Product Image URL",
                "productImageURL",
                "url",
                "Enter image URL"
              )}
              {renderFormField(
                "Product Name",
                "productName",
                "text",
                "Enter product name",
                true
              )}
              {renderFormField(
                "Product Description",
                "productDescription",
                "text",
                "Enter product description"
              )}

              <div className="grid grid-cols-2 gap-4">
                {renderFormField("Product Type", "productType")}
                {renderFormField("Quantity", "quantity", "number", "0", true)}
              </div>

              {renderFormField("Price", "price", "number", "0", true)}

              {/* Modal Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting
                    ? editingProduct
                      ? "Updating..."
                      : "Adding..."
                    : editingProduct
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
