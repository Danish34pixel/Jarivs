// components/SIfra/SIfra.jsx
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../Context/UserContext";
import AssistantInfoPanel from "./AssistantInfoPanel";
import LogoutButton from "./LogoutButton";
import ModelCanvas from "./ModelCanvas";
import { useLogout } from "../utils/useLogout";
import { useVoiceRecognition } from "../utils/useVoiceRecognition";

function SIfra() {
  const { userData, setUserData, ServerUrl } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const handleLogout = useLogout(ServerUrl, setUserData);

  const { isListening, error, lastTranscript } = useVoiceRecognition({
    userData,
    handleLogout,
  });

  // Simulate loading and connection establishment
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setConnectionStatus("connected");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              Initializing SIfra
            </h2>
            <p className="text-gray-400 text-sm">
              Establishing secure connection...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] relative flex flex-col overflow-hidden font-inter antialiased">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        {/* Secondary gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent" />

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full blur-sm animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full blur-sm animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-indigo-400/25 rounded-full blur-sm animate-pulse delay-1000" />
      </div>

      {/* Status Bar */}
      <div className="relative z-50 px-6 py-4 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <img
                  className="w-6 h-6 rounded-full"
                  src="./my name is danish khan give a logo related to my name.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-xl font-semibold text-white tracking-tight">
                AI Assistant
              </h1>
            </div>

            {/* Connection Status */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium capitalize">
                {connectionStatus}
              </span>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {userData?.name && (
              <div className="text-right">
                <p className="text-white font-medium text-sm">Welcome back</p>
                <p className="text-gray-400 text-xs">{userData.name}</p>
              </div>
            )}
            <LogoutButton handleLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex">
        {/* Left Panel - Assistant Info */}
        <div className="w-80 relative z-40 border-r border-gray-800/50 backdrop-blur-sm">
          <div className="h-full overflow-y-auto">
            <AssistantInfoPanel
              userData={userData}
              isListening={isListening}
              error={error}
              lastTranscript={lastTranscript}
            />
          </div>
        </div>

        {/* Right Panel - 3D Model */}
        <div className="flex-1 relative">
          <ModelCanvas assistantglb={userData?.assistantglb} />

          {/* Overlay Controls */}
          <div className="absolute bottom-6 right-6 z-30">
            <div className="flex flex-col space-y-3">
              {/* Voice Status Indicator */}
              {isListening && (
                <div className="bg-red-500/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-3 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                  <span className="text-white text-sm font-medium">
                    Listening...
                  </span>
                </div>
              )}

              {/* Error Indicator */}
              {error && (
                <div className="bg-red-600/90 backdrop-blur-sm rounded-lg px-4 py-2 max-w-xs">
                  <p className="text-white text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-40 px-6 py-3 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 text-xs text-gray-400">
            <span>SIfra v2.0</span>
            <span>•</span>
            <span>Neural Processing Active</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>System Optimal</span>
            </span>
          </div>

          <div className="text-xs text-gray-400">
            Last sync: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SIfra;
