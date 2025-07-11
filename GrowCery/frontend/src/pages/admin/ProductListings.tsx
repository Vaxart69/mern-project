import { useEffect, useState } from "react";

interface Product {
  _id: string;
  productName: string;
  productType: number;
  productQuantity: number;
  price: number;
  productDescription: string;
  productImage?: string;
}

interface FormData {
  productName: string;
  productType: string;
  productQuantity: string;
  price: string;
  productDescription: string;
  productImage: string;
}

export default function ProductListings() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    productType: "1",
    productQuantity: "",
    price: "",
    productDescription: "",
    productImage: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      productName: "",
      productType: "1",
      productQuantity: "",
      price: "",
      productDescription: "",
      productImage: "",
    });
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      productType: product.productType.toString(),
      productQuantity: product.productQuantity.toString(),
      price: product.price.toString(),
      productDescription: product.productDescription,
      productImage: product.productImage || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      productName: "",
      productType: "1",
      productQuantity: "",
      price: "",
      productDescription: "",
      productImage: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const url = editingProduct
        ? `http://localhost:3000/products/${editingProduct._id}`
        : "http://localhost:3000/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productName: formData.productName,
          productType: parseInt(formData.productType),
          productQuantity: parseInt(formData.productQuantity),
          price: parseFloat(formData.price),
          productDescription: formData.productDescription,
          productImage: formData.productImage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchProducts();
        handleCloseModal();
      } else {
        alert(data.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        await fetchProducts();
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderDeleteButton = (product: Product) => (
    <button
      onClick={() => handleDeleteProduct(product._id)}
      className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1 rounded text-sm border border-red-200 transition"
    >
      Delete
    </button>
  );

  const renderEditButton = (product: Product) => (
    <button
      onClick={() => handleEditProduct(product)}
      className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm border border-blue-200 transition mr-2"
    >
      Edit
    </button>
  );

  const renderProductActions = (product: Product) => (
    <div className="flex gap-2">
      {renderEditButton(product)}
      {renderDeleteButton(product)}
    </div>
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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          value={formData[name as keyof FormData]}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-800"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name as keyof FormData]}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-800"
        />
      )}
    </div>
  );

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Product Listings
          </h1>
          <p className="text-gray-600 text-lg">
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
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex items-center gap-4 shadow-sm">
        <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 py-2">
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
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
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
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
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
            <form onSubmit={handleSubmit}>
              {renderFormField(
                "Product Name",
                "productName",
                "text",
                "Enter product name",
                true
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-800"
                >
                  <option value="1">Crops</option>
                  <option value="2">Poultry</option>
                </select>
              </div>

              {renderFormField(
                "Quantity",
                "productQuantity",
                "number",
                "Enter quantity",
                true
              )}
              {renderFormField("Price", "price", "number", "Enter price", true)}
              {renderFormField(
                "Description",
                "productDescription",
                "text",
                "Enter description",
                true,
                3
              )}
              {renderFormField(
                "Image URL",
                "productImage",
                "url",
                "Enter image URL"
              )}

              {/* Modal Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50"
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
