// components/SIfra/useGeminiResponse.js
import { useCallback } from "react";
import axios from "axios";

const ServerUrl = import.meta.env.VITE_SERVER_URL;

export const getGeminiResponse = async (userInput) => {
  try {
    const response = await axios.post(
      `${ServerUrl}/api/gemini/respond`,
      { message: userInput },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // or "multipart/form-data" if using FormData
        },
      }
    );
    // console.log("this is rawa response by geminin", response);
    return response?.data?.reply || "I'm not sure how to respond.";
  } catch (err) {
    console.error("Gemini error:", err);
    return "Sorry, I couldn't process that.";
  }
};
