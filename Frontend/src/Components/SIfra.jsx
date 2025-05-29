// components/SIfra/SIfra.jsx
import React, { useContext } from "react";
import { UserDataContext } from "../Context/UserContext";
import AssistantInfoPanel from "./AssistantInfoPanel";
import LogoutButton from "./LogoutButton";
import ModelCanvas from "./ModelCanvas";
import { useLogout } from "../utils/useLogout";
// import { useGeminiResponse } from "../utils/useGeminiResponse";
import { useVoiceRecognition } from "../utils/useVoiceRecognition";

function SIfra() {
  const { userData, setUserData, ServerUrl } = useContext(UserDataContext);

  const handleLogout = useLogout(ServerUrl, setUserData);
  // const getGeminiResponse = useGeminiResponse(ServerUrl);

  const { isListening, error, lastTranscript } = useVoiceRecognition({
    userData,
    handleLogout,
  });
  // getGeminiResponse,

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f0f0f] via-[#1a1a1a] to-[#0e0e2e] relative flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1f2937]/30 via-transparent to-transparent z-0" />

      <LogoutButton handleLogout={handleLogout} />

      <AssistantInfoPanel
        userData={userData}
        isListening={isListening}
        error={error}
        lastTranscript={lastTranscript}
      />

      <ModelCanvas assistantglb={userData?.assistantglb} />
    </div>
  );
}

export default SIfra;
