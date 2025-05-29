import React from "react";

const AssistantInfoPanel = ({
  userData,
  isListening,
  error,
  lastTranscript,
}) => (
  <div className="absolute top-5 left-6 z-30 bg-white/5 backdrop-blur-lg p-4 rounded-xl shadow-2xl border border-white/10 max-w-xs animate-fadeIn">
    <h1 className="text-3xl font-bold text-cyan-300 mb-3 tracking-wide">
      {userData?.assistantName || "Jarvis"}
    </h1>
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full ${
          isListening ? "bg-green-400 animate-ping" : "bg-red-500"
        }`}
      />
      <span className="text-sm text-white">
        {isListening ? "Listening..." : error ? `Error: ${error}` : "Idle"}
      </span>
    </div>
    {lastTranscript && (
      <div className="mt-3 p-3 text-white text-sm bg-white/10 rounded-lg border border-white/10">
        You said: <span className="italic">"{lastTranscript}"</span>
      </div>
    )}
  </div>
);

export default AssistantInfoPanel;
