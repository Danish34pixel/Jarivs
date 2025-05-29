import React, { useState } from "react";
import { Loader, Lock, User, Power, Shield } from "lucide-react";

const Login = () => {
  const [fullName, setFullName] = useState(""); // renamed
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    setLoginStatus("Verifying credentials...");

    setTimeout(() => {
      setIsLoading(false);
      if (fullName === "stark" && password === "jarvis123") {
        setLoginStatus("Access granted. Welcome back, sir.");
      } else {
        setLoginStatus("Access denied. Invalid credentials.");
      }
    }, 2000);
  };

  const particles = Array(50)
    .fill()
    .map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.1,
    }));

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-slate-900 overflow-hidden">
      {/* ...background and decoration remain unchanged... */}

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

      {/* Login container */}
      <div
        className="relative z-10 w-full max-w-md opacity-0 scale-90"
        style={{ animation: "fadeIn 0.5s forwards" }}
      >
        <div className="flex flex-col items-center mb-6">
          <div
            className="flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-blue-900/50 border-2 border-blue-400/50 scale-0"
            style={{ animation: "scaleIn 0.5s 0.3s forwards" }}
          >
            <div
              className="absolute w-16 h-16 rounded-full border border-blue-300/40"
              style={{ animation: "spin 20s linear infinite" }}
            />
            <Power size={32} className="text-blue-300" />
          </div>

          <h1
            className="text-3xl font-bold text-blue-300 tracking-widest opacity-0 translate-y-5"
            style={{ animation: "slideUp 0.5s 0.5s forwards" }}
          >
            J.A.R.V.I.S.
          </h1>
          <p
            className="mt-4 text-blue-200/60 text-sm opacity-0"
            style={{ animation: "fadeIn 0.5s 0.8s forwards" }}
          >
            Just A Rather Very Intelligent System
          </p>
        </div>

        <div
          className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/10 translate-y-5 opacity-0"
          style={{ animation: "slideUp 0.5s 0.6s forwards" }}
        >
          {/* Full Name Input */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                <User size={18} />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-3 top-3 text-blue-400 hover:scale-105 transition-transform">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-900/40 border border-blue-500/30 text-blue-100 py-2 pl-10 pr-4 rounded-md focus:outline-none hover:border-blue-400/50 transition-colors"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-600/90 hover:bg-blue-500 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin">
                <Loader size={20} />
              </div>
            ) : (
              <>
                <Shield size={16} className="mr-2" />
                Authenticate
              </>
            )}
          </button>

          {/* Status Message */}
          {loginStatus && (
            <p
              className={`mt-4 text-center text-sm animate-fadeIn ${
                loginStatus.includes("Access granted")
                  ? "text-green-400"
                  : loginStatus.includes("Access denied")
                  ? "text-red-400"
                  : "text-blue-300"
              }`}
            >
              {loginStatus}
            </p>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-blue-500/20 text-center text-blue-300/50 text-xs">
            <p>STARK INDUSTRIES • SECURITY LEVEL ALPHA</p>
            <p className="mt-1">© 2025 STARK TECHNOLOGIES</p>
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

      {/* Scan line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400/30 animate-pulse"></div>
      <div className="absolute bottom-10 left-0 right-0 h-px bg-blue-500/20"></div>
      <div className="absolute bottom-20 left-0 right-0 h-px bg-blue-500/10"></div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
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

export default Login;
