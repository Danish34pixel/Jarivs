import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserDataContext = createContext();
const ServerUrl = import.meta.env.VITE_SERVER_URL;

const UserContext = ({ children }) => {
  const [UserData, setUserData] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [uploadedModel, setUploadedModel] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [modelPreviewUrl, setModelPreviewUrl] = useState(null);
  const handleCurrentUser = async () => {
    try {
      console.log("Fetching current user...");
      const result = await axios.get(`${ServerUrl}/api/auth/currentUser`, {
        withCredentials: true,
      });
      // console.log("Current user response:", result.data);
      if (result.data && result.data.user) {
        setUserData(result.data.user);
      }
    } catch (error) {
      console.log("Error fetching current user:", error);
    }
  };
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${ServerUrl}/api/assistant/askToAssistant`,
        {
          command,
        },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);
  const value = {
    ServerUrl,
    userData: UserData,
    setUserData,
    selectedModel,
    setSelectedModel,
    uploadedModel,
    setUploadedModel,
    modelFile,
    setModelFile,
    modelPreviewUrl,
    setModelPreviewUrl,
    getGeminiResponse,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
