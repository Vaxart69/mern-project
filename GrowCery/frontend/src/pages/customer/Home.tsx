import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";

interface Product {
  _id: string;
  productName: string;
  productType: number;
  price: number;
  productImage?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("name-asc");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  const getType = (type: number) => (type === 1 ? "Crops" : "Poultry");

  const handleProductClick = (productId: string) => {
    navigate(`/customer/product/${productId}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.productName.localeCompare(b.productName);
        case "name-desc":
          return b.productName.localeCompare(a.productName);
        default:
          return 0;
      }
    });
  };

  const getFilteredAndSortedProducts = () => {
    const filtered = products.filter((product) =>
      selectedCategories.length
        ? selectedCategories.includes(product.productType)
        : true
    );
    return sortProducts(filtered);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row h-full bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB]">
      {/* Sidebar Filter - Hidden on mobile */}
      <div className="hidden md:block w-64 h-full bg-white shadow-lg p-6 flex-shrink-0 overflow-y-auto">
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2 accent-black"
                name="category"
                value="0"
                onChange={() => setSelectedCategories([])}
                checked={!selectedCategories.length}
              />
              <span className="text-gray-800">All</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2 accent-black"
                name="category"
                value="1"
                onChange={() => setSelectedCategories([1])}
                checked={selectedCategories[0] === 1}
              />
              <span className="text-gray-800">Crops</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="mr-2 accent-black"
                name="category"
                value="2"
                onChange={() => setSelectedCategories([2])}
                checked={selectedCategories[0] === 2}
              />
              <span className="text-gray-800">Poultry</span>
            </label>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort By</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Mobile filters (shown only on small screens) */}
      <div className="md:hidden bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <select
            className="p-2 border border-gray-300 rounded-lg text-gray-800 flex-1 mr-2"
            onChange={(e) => {
              if (e.target.value === "0") {
                setSelectedCategories([]);
              } else {
                setSelectedCategories([parseInt(e.target.value)]);
              }
            }}
            value={
              selectedCategories.length ? selectedCategories[0].toString() : "0"
            }
          >
            <option value="0">All Categories</option>
            <option value="1">Crops</option>
            <option value="2">Poultry</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded-lg text-gray-800 flex-1"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 h-full overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16 md:pb-2">
          {products.length === 0 ? (
            <div className="col-span-full">
              <EmptyState
                icon="📦"
                title="No products available"
                description="Check back later for new products"
              />
            </div>
          ) : (
            getFilteredAndSortedProducts().map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow p-3 flex flex-col items-start cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <div className="font-bold text-black">
                  {product.productName}
                </div>
                <div className="text-xs text-gray-500">
                  {getType(product.productType)}
                </div>
                <div className="text-base font-semibold text-[#43A047]">
                  ₱{product.price}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
