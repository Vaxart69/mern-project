import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // used navigate hook for redirecting after successful login
  const navigate = useNavigate();

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

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // prevent reload and set error to empty string
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // fetch the login endpoint
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // get the response and check if it is ok
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // store the token
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      localStorage.setItem("user", JSON.stringify(payload));

      // Redirect based on user type
      if (payload.userType === "admin") {
        navigate("/admin/order-management");
      } else {
        navigate("/customer/home");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="mt-4 text-center text-white text-sm md:text-base">
              Loading...
            </div>
          </div>
        </div>
      )}

      <main className="h-screen flex flex-col md:flex-row">
        <div className="px-4 bg-[#000a00] flex-1 py-6 md:py-10 md:min-w-[25rem] flex flex-col">
          <div className="md:min-w-[20rem] md:ml-7">
            <h2
              data-aos="fade-right"
              className="text-white text-xl md:text-[2rem] font-bold"
            >
              GrowCery🌿
            </h2>
            <h1
              data-aos="fade-right"
              className="mt-4 md:mt-8 text-white text-xl md:text-3xl tracking-wider"
            >
              Log in to your account
            </h1>
            <h1
              data-aos="fade-right"
              className="mt-2 md:mt-3 text-white text-sm md:text-lg font-bold tracking-wide"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-300 cursor-pointer hover:text-green-200 transition-colors"
              >
                Sign up
              </Link>
            </h1>
          </div>

          <div className="relative flex-1 md:pl-7">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              {error && (
                <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-2 rounded-sm mb-4 text-sm mt-7 md:w-[19rem]">
                  {"Please provide a valid email address and password."}
                </div>
              )}

              <div data-aos="fade-right" className="space-y-4 mt-6 ">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  disabled={isLoading}
                  className="border border-gray-400 rounded-sm text-white bg-green-900/50 placeholder-gray-300 px-3 py-2 w-full md:w-[19rem] focus:outline-none focus:border-green-300 focus:bg-green-800/70 transition-all duration-200 disabled:opacity-50"
                  required
                />

                <div className="relative w-full md:w-[19rem] ">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    disabled={isLoading}
                    className="border border-gray-400 rounded-sm text-white bg-green-900/50 placeholder-gray-300 px-3 py-2 w-full pr-10 focus:outline-none focus:border-green-300 focus:bg-green-800/70 transition-all duration-200 disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464a10.05 10.05 0 00-5.436 11.243M9.878 9.878A3 3 0 019 12M21 12c-1.27 3.411-4.066 6-7.5 6.5M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                data-aos="fade-up"
                type="submit"
                disabled={isLoading}
                className="mt-auto mb-4 bg-green-600 px-5 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 w-full md:w-[12rem] md:absolute md:bottom-20 md:left-7 border border-transparent hover:bg-green-500 hover:border-green-400 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Signing in..." : "Next"}
              </button>
            </form>
          </div>
        </div>

        <div className="relative h-[30%] md:h-full md:w-[75%] px-4 py-4 md:px-[3.5rem] md:py-[4rem] flex flex-col overflow-hidden">
          {/* Gradient Background Image */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60 -z-10"
            src="/gradient.png"
            alt="Gradient-img"
          />

          {/* Blur Effect */}
          <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_30px_#87ab87] -rotate-[30deg] -z-10"></div>

          <h1
            data-aos="fade-down"
            className="font-bold text-lg md:text-2xl lg:text-3xl text-white"
          >
            GrowCery is here
          </h1>
          <p
            data-aos="fade-down"
            className="mt-2 md:mt-[2rem] text-sm md:text-lg text-white max-w-xs md:max-w-lg"
          >
            Up to 32% higher throughput, improved horizontal scaling, expanded
            queryable encryption capabilities, and more.
          </p>

          <img
            data-aos="fade-left"
            src="./model.png"
            className="hidden md:block absolute bottom-0 right-0 max-h-full max-w-[60%] object-contain"
            alt="Model"
          />
        </div>
      </main>
    </>
  );
};

export default SignIn;
