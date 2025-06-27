export default function Orders() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] p-8">
      <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-white">📦</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">My Orders</h1>
        <p className="text-xl text-gray-600 mb-6">
          Track your current and past orders
        </p>
        <div className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white px-6 py-3 rounded-lg inline-block">
          Customer Orders Page
        </div>
      </div>
    </div>
  );
}