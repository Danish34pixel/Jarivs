// components/SIfra/useVoiceRecognition.js
import { useCallback, useEffect, useRef, useState } from "react";
import { speakText } from "./speak";
import { getGeminiResponse } from "./useGeminiResponse.js";

// getGeminiResponse,
export function useVoiceRecognition({ userData, handleLogout }) {
  // const getGeminiResponse = useGeminiResponse(transcript);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const lastRestartTimestampRef = useRef(0);

  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [restartAttempt, setRestartAttempt] = useState(0);

  const COOLDOWN_PERIOD = 3000;
  const MAX_RESTART_ATTEMPTS = 5;
  const RESTART_DELAY = 2000;

  const handleVoiceCommand = useCallback(
    (command) => {
      const assistantName =
        userData?.assistantName?.toLowerCase() || "my friend";
      if (command.includes(assistantName)) setIsListening(true);
      if (command.includes("logout")) handleLogout();
    },
    [userData, handleLogout]
  );

  const initializeRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
      setError(null);
    };

    // recognition.onresult = async (event) => {
    //   const result = event.results[event.results.length - 1];
    //   if (result.isFinal) {
    //     const transcript = result[0].transcript.toLowerCase().trim();
    //     setLastTranscript(transcript);
    //     handleVoiceCommand(transcript);
    //     const aiResponse = await getGeminiResponse(transcript);
    //     console.log("AI Response:", aiResponse);
    //     speakText(aiResponse);
    //     if (aiResponse.redirectTo) window.open(aiResponse.redirectTo, "_blank");
    //   }
    // };

    recognition.onresult = async (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const transcript = result[0].transcript.toLowerCase().trim();
        setLastTranscript(transcript);
        handleVoiceCommand(transcript);
        const aiResponse = await getGeminiResponse(transcript);
        // console.log("AI Response:", aiResponse);
        speakText(aiResponse.response);

        if (aiResponse.redirectTo) {
          window.open(aiResponse.redirectTo, "_blank");
        }
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isListeningRef.current = false;
      setIsListening(false);

      const errorMap = {
        network: "Network error. Please check your internet connection.",
        "not-allowed": "Microphone access denied.",
        "no-speech": "No speech detected.",
        aborted: "Recognition aborted.",
        "audio-capture": "No microphone detected.",
        "service-not-allowed": "Speech recognition not allowed.",
      };

      setError(errorMap[event.error] || `Unknown error: ${event.error}`);
      if (["network", "no-speech", "aborted"].includes(event.error)) {
        setRestartAttempt((prev) => prev + 1);
      } else {
        recognitionRef.current = null;
      }
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setIsListening(false);
      if (!error && document.visibilityState === "visible") {
        setRestartAttempt((prev) => prev + 1);
      }
    };

    return recognition;
  }, [getGeminiResponse, handleVoiceCommand, error]);

  const startListening = useCallback(() => {
    if (isListeningRef.current) return;
    const now = Date.now();
    if (now - lastRestartTimestampRef.current < COOLDOWN_PERIOD) return;
    lastRestartTimestampRef.current = now;

    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
      if (!recognitionRef.current) return;
    }

    try {
      recognitionRef.current.start();
    } catch (e) {
      if (e.name === "InvalidStateError") {
        isListeningRef.current = true;
        setIsListening(true);
      } else {
        setError(`Failed to start recognition: ${e.message}`);
      }
    }
  }, [initializeRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListeningRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Stop recognition error:", e);
      } finally {
        recognitionRef.current = null;
        isListeningRef.current = false;
        setIsListening(false);
      }
    }
  }, []);

  useEffect(() => {
    startListening();
    const handleVisibilityChange = () =>
      document.visibilityState === "hidden"
        ? stopListening()
        : startListening();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopListening();
    };
  }, [startListening, stopListening]);

  useEffect(() => {
    if (restartAttempt > 0 && !isListeningRef.current && !error) {
      if (restartAttempt > MAX_RESTART_ATTEMPTS) {
        setError("Max restart attempts reached. Please refresh the page.");
        return;
      }
      const timeout = setTimeout(startListening, RESTART_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [restartAttempt, error, startListening]);

  return { isListening, error, lastTranscript };
}
