import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedShapes from "../components/AnimatedShapes";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        // Redirect based on user type if already logged in
        if (userData.userType === "admin") {
          navigate("/admin/order-management", { replace: true });
        } else {
          navigate("/customer/home", { replace: true });
        }
      } catch (error) {
        // Invalid data, clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setError("");
      setSuccess("Account created successfully! You can now sign in.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#121212]">
      <AnimatedShapes shouldAnimate={false} />

      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-[#1E1E1E] rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col items-center"
        >
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-[#7C3AED] flex items-center justify-center mb-2 shadow-lg">
              <span
                className="text-4xl font-bold"
                style={{
                  color: "#1E1E1E",
                }}
              >
                G
              </span>
            </div>
            <p className="text-center text-[#C4B5FD] text-base mt-3">
              Create an account to join Growcery!
            </p>
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="px-4 py-3 rounded-xl bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <div className="flex gap-4 w-full">
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                className="w-1/2 px-4 py-3 rounded-xl bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                value={formData.middleName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 px-4 py-3 rounded-xl bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="px-4 py-3 rounded-xl bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-4 py-3 rounded-xl bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-[#7C3AED] hover:bg-[#A78BFA] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-[#C4B5FD] text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline font-semibold text-[#A78BFA]"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
