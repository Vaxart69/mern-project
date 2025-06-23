import React, { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#121212]">
      <div className="hidden md:flex w-1/2 h-screen items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          className="w-full h-full"
        >
          <circle cx="200" cy="650" r="140" fill="#6200EE" />

          <circle cx="450" cy="450" r="100" fill="#7C3AED" />

          <circle cx="200" cy="350" r="90" fill="#A78BFA" />

          <circle cx="320" cy="150" r="50" fill="#C4B5FD" />
          <circle cx="500" cy="200" r="45" fill="#8B5CF6" />

          <circle cx="600" cy="100" r="35" fill="#E9D5FF" />

          <circle cx="700" cy="80" r="20" fill="#fff" />
          <circle cx="750" cy="300" r="12" fill="#fff" />
          <circle cx="120" cy="400" r="12" fill="#fff" />
          <circle cx="700" cy="600" r="20" fill="#A78BFA" />
          <circle cx="600" cy="700" r="25" fill="#C4B5FD" />

          <line
            x1="100"
            y1="100"
            x2="350"
            y2="160"
            stroke="#7C3AED"
            strokeWidth="7"
          />
          <line
            x1="500"
            y1="250"
            x2="780"
            y2="300"
            stroke="#A78BFA"
            strokeWidth="7"
          />
          <line
            x1="150"
            y1="500"
            x2="400"
            y2="550"
            stroke="#8B5CF6"
            strokeWidth="7"
          />
          <line
            x1="400"
            y1="700"
            x2="700"
            y2="750"
            stroke="#6200EE"
            strokeWidth="7"
          />
          <line
            x1="500"
            y1="350"
            x2="600"
            y2="400"
            stroke="#C4B5FD"
            strokeWidth="7"
          />
          <line
            x1="100"
            y1="700"
            x2="400"
            y2="750"
            stroke="#E9D5FF"
            strokeWidth="7"
          />
        </svg>
      </div>

      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <form className="bg-[#1E1E1E] rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-[#7C3AED] flex items-center justify-center mb-2 shadow-lg">
              <span
                className="text-4xl font-bold"
                style={{
                  color: "#1E1E1E",
                  textShadow: "0 2px 8px #A78BFA",
                }}
              >
                G
              </span>
            </div>
            <p className="text-center text-[#C4B5FD] text-base mt-3">
              Welcome to Growcery! Please sign in to continue.
            </p>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="px-4 py-3 rounded-xl bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#7C3AED] w-full pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-[#7C3AED] focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye-off Outline
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7C3AED"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M6.343 6.343A7.963 7.963 0 004 12c0 4.418 3.582 8 8 8 1.657 0 3.234-.336 4.675-.938M17.657 17.657A7.963 7.963 0 0020 12c0-4.418-3.582-8-8-8-1.657 0-3.234.336-4.675.938M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <line
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    stroke="#7C3AED"
                    strokeWidth={2}
                  />
                </svg>
              ) : (
                // Eye Outline
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7C3AED"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#7C3AED] hover:bg-[#A78BFA] text-white font-semibold py-3 rounded-xl transition"
          >
            Sign In
          </button>
          <div className="mt-2 text-center text-[#C4B5FD] text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="underline font-semibold text-[#A78BFA]"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
