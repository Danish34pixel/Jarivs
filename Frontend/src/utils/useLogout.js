// components/SIfra/useLogout.js
import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useLogout(ServerUrl, setUserData) {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        `${ServerUrl}/api/auth/LogOut`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // or "multipart/form-data" if using FormData
          },
        }
      );
      setUserData(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      throw new Error("Failed to log out. Please try again.");
    }
  }, [ServerUrl, setUserData, navigate]);

  return handleLogout;
}
