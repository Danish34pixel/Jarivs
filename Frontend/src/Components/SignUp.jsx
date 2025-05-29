import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import {
  Loader,
  Lock,
  User,
  Power,
  Shield,
  Mail,
  UserPlus,
  LogIn,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const { ServerUrl, setUserData } = useContext(UserDataContext);
  // State for form inputs and UI
  const [activeView, setActiveView] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  ); // We get setUserData from context

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Authentication handlers
  const handleLogin = async () => {
    console.log("Login data:", { email, password });
    setIsLoading(true);
    setStatusMessage("Verifying credentials...");
    try {
      const response = await axios.post(
        `${ServerUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // or "multipart/form-data" if using FormData
          },
        }
      );

      setIsLoading(false);
      if (response.data && response.data.user) {
        setUserData(response.data);
        setStatusMessage("Access granted. Welcome back!");
        navigate("/custom"); // Navigate to customization page after successful login
      } else {
        setStatusMessage(
          response.data?.message || "Access denied. Invalid credentials."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setUserData(null);
      setStatusMessage(
        error.response?.data?.message || "Access denied. Invalid credentials."
      );
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setStatusMessage("");
    // Validate inputs first
    if (!fullName || !email || !password) {
      setIsLoading(false);
      setStatusMessage("All fields are required.");
      return;
    }
    try {
      let result = await axios.post(
        `${ServerUrl}/api/auth/signup`,
        {
          name: fullName, // send as 'name' for backend
          password,
          email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // or "multipart/form-data" if using FormData
          },
        }
      );
      setUserData(result.data);
      setIsLoading(false);
      setStatusMessage("Profile created successfully!");
      navigate("/custom"); // Navigate to customization page after successful signup
    } catch (error) {
      setIsLoading(false);
      setUserData(null);
      setStatusMessage(error.response?.data?.message || "Error during signup.");
    }
  };

  const switchView = (view) => {
    setStatusMessage("");
    setActiveView(view);
  };

  // Create animated particles for the background
  const particles = Array(50)
    .fill()
    .map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.1,
    }));

  const isSmallScreen = windowWidth < 640;
  const isMediumScreen = windowWidth < 768;

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-slate-900 overflow-hidden">
      {/* Laboratory background elements */}
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        {/* Lab equipment outlines */}
        <div className="absolute top-10 left-10 w-64 h-32 border-l-2 border-t-2 border-blue-400/20"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-r-2 border-b-2 border-blue-300/20"></div>
        <div className="absolute top-1/4 right-20 w-32 h-32 border-2 border-blue-400/10 rounded-full"></div>

        {/* Lab grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4a88bd 1px, transparent 1px), linear-gradient(to bottom, #4a88bd 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Holographic displays */}
        {!isSmallScreen && (
          <>
            <div
              className="absolute top-20 right-32 w-64 h-32 bg-blue-500/5 border border-blue-400/20 rounded-md"
              style={{
                transform: "perspective(500px) rotateX(10deg) rotateY(-20deg)",
              }}
            >
              <div className="absolute top-2 left-2 w-3/4 h-2 bg-blue-400/40 rounded-full"></div>
              <div className="absolute top-8 left-4 w-1/3 h-2 bg-blue-400/30 rounded-full"></div>
              <div className="absolute top-14 left-2 w-1/2 h-2 bg-blue-400/30 rounded-full"></div>
              <div className="absolute top-20 left-6 w-2/3 h-2 bg-blue-400/40 rounded-full"></div>
            </div>

            <div
              className="absolute bottom-24 left-32 w-72 h-40 bg-blue-500/5 border border-blue-400/20 rounded-md"
              style={{
                transform: "perspective(500px) rotateX(-5deg) rotateY(10deg)",
              }}
            >
              <div className="w-full h-full flex flex-wrap">
                {Array(20)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-1/5 h-1/4 border border-blue-400/10 flex items-center justify-center"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          Math.random() > 0.7
                            ? "bg-blue-400/60"
                            : "bg-blue-400/20"
                        }`}
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.4,
              animation: `float ${10 / particle.speed}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Circular tech patterns */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="absolute w-96 h-96 rounded-full border border-blue-500/20 opacity-20"
          style={{
            top: "20%",
            left: "10%",
            animation: "spin 100s linear infinite",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full border-2 border-blue-400/10 opacity-30"
          style={{
            bottom: "10%",
            right: "15%",
            animation: "spin-reverse 80s linear infinite",
          }}
        />
        <div
          className="absolute w-40 h-40 rounded-full border border-blue-500/30 opacity-20"
          style={{
            top: "40%",
            right: "30%",
            animation: "spin 60s linear infinite",
          }}
        />
      </div>

      {/* Main container */}
      <div
        className="relative z-10 w-full max-w-md px-4 md:px-0 opacity-0 scale-90"
        style={{ animation: "fadeIn 0.5s forwards" }}
      >
        {/* Logo and header */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 mb-4 rounded-full bg-blue-900/50 border-2 border-blue-400/50 scale-0"
            style={{ animation: "scaleIn 0.5s 0.3s forwards" }}
          >
            <div
              className="absolute w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-blue-300/40"
              style={{ animation: "spin 20s linear infinite" }}
            />
            <Power size={isSmallScreen ? 24 : 28} className="text-blue-300" />
          </div>

          <h1
            className="text-2xl sm:text-3xl font-bold text-blue-300 tracking-widest opacity-0 translate-y-5"
            style={{ animation: "slideUp 0.5s 0.5s forwards" }}
          >
            J.A.R.V.I.S.
          </h1>

          <p
            className="mt-4 text-blue-200/60 text-xs sm:text-sm opacity-0"
            style={{ animation: "fadeIn 0.5s 0.8s forwards" }}
          >
            Just A Rather Very Intelligent System
          </p>
        </div>

        {/* Auth forms */}
        <div
          className="bg-slate-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/10 translate-y-5 opacity-0"
          style={{ animation: "slideUp 0.5s 0.6s forwards" }}
        >
          {/* Form header with tabs */}
          <div className="flex justify-center mb-6 relative">
            <div className="flex space-x-1 sm:space-x-4 bg-slate-900/30 rounded-full p-1">
              <button
                onClick={() => switchView("login")}
                className={`flex items-center text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors ${
                  activeView === "login"
                    ? "bg-blue-600/80 text-white"
                    : "text-blue-300/70 hover:text-blue-200"
                }`}
              >
                <LogIn size={14} className="mr-1 sm:mr-2" />
                <span>Login</span>
              </button>
              <button
                onClick={() => switchView("signup")}
                className={`flex items-center text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors ${
                  activeView === "signup"
                    ? "bg-blue-600/80 text-white"
                    : "text-blue-300/70 hover:text-blue-200"
                }`}
              >
                <UserPlus size={14} className="mr-1 sm:mr-2" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeView === "login" && (
            <div>
              {/* Username input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                    <User size={16} />
                  </div>{" "}
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Login button */}
              <button
                className="w-full bg-blue-600/90 hover:bg-blue-500 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-sm"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin">
                    <Loader size={18} />
                  </div>
                ) : (
                  <>
                    <Shield size={14} className="mr-2" />
                    Authenticate
                  </>
                )}
              </button>
            </div>
          )}

          {/* Signup Form */}
          {activeView === "signup" && (
            <div>
              {/* Full Name input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Signup button */}
              <button
                className="w-full bg-blue-600/90 hover:bg-blue-500 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-sm"
                onClick={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin">
                    <Loader size={18} />
                  </div>
                ) : (
                  <>
                    <UserPlus size={14} className="mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          )}

          {/* Status message */}
          {statusMessage && (
            <p
              className={`mt-4 text-center text-xs sm:text-sm animate-fadeIn ${
                statusMessage.includes("Access granted") ||
                statusMessage.includes("created successfully")
                  ? "text-green-400"
                  : statusMessage.includes("Access denied") ||
                    statusMessage.includes("required")
                  ? "text-red-400"
                  : "text-blue-300"
              }`}
            >
              {statusMessage}
            </p>
          )}

          {/* Tech decoration */}
          <div className="mt-6 pt-4 border-t border-blue-500/20 text-center text-blue-300/50 text-xs">
            <p className="text-xs">DK INDUSTRIES • SECURITY LEVEL ALPHA</p>
            <p className="mt-1 text-xs">© 2025 DK TECHNOLOGIES</p>

            {/* Lab measurement markings */}
            <div className="mt-4 flex justify-between">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div key={i} className="h-2 w-px bg-blue-400/30"></div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scan line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400/30 animate-pulse"></div>
      <div className="absolute bottom-10 left-0 right-0 h-px bg-blue-500/20"></div>
      <div className="absolute bottom-20 left-0 right-0 h-px bg-blue-500/10"></div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0.2;
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.3;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s forwards;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
