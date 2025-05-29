import User from "../Models/User.model.js";
import { uploadOnCloudinary } from "../config/Cloudinary.js";
import geminiResponse from "../Gemini.js";
import moment from "moment";

// ✅ Get Current User Info
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const foundUser = await User.findById(userId).select("-password");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: foundUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Assistant GLB or Name
export const updateassisment = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ message: "Unauthorized - No user ID" });
    }

    const { assistantName, glbURL } = req.body;
    let assistantglb;

    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      const uploadedUrl = await uploadOnCloudinary(req.file.path);
      if (!uploadedUrl) {
        return res
          .status(500)
          .json({ message: "Failed to upload file to Cloudinary" });
      }
      assistantglb = uploadedUrl;
    } else if (glbURL) {
      console.log("Using provided model URL:", glbURL);
      assistantglb = glbURL;
    } else {
      return res.status(400).json({ message: "No model file or URL provided" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { assistantName, assistantglb },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Update assistant error" });
  }
};

// ✅ Ask Assistant (with local date/time/day/month logic)
export const askToAssistant = async (req, res) => {
  try {
    console.log("ask to assitant controller chla");
    const { command } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lowerCommand = command?.toLowerCase() || "";

    console.log(command);

    console.log(moment().format("YYYY-MM-DD"));

    // 🔁 Local fallback for time/date/day/month
    if (lowerCommand.includes("date")) {
      return res.json({
        type: "get-date",
        userinput: command,
        response: `Current date is ${moment().format("YYYY-MM-DD")}`,
      });
    }
    ``;
    if (lowerCommand.includes("time")) {
      return res.json({
        type: "get-time",
        userinput: command,
        response: `Current time is ${moment().format("hh:mm A")}`,
      });
    }

    if (lowerCommand.includes("day")) {
      return res.json({
        type: "get-day",
        userinput: command,
        response: `Today is ${moment().format("dddd")}`,
      });
    }

    if (lowerCommand.includes("month")) {
      return res.json({
        type: "get-month",
        userinput: command,
        response: `Current month is ${moment().format("MMMM")}`,
      });
    }

    // 🤖 Use Gemini AI for other requests
    const userName = user.name;
    const assistantName = user.assistantName;
    const gemResult = await geminiResponse(command, assistantName, userName);

    const type = gemResult.type;
    const userinput = gemResult.userinput || command;

    switch (type) {
      case "get-date":
        return res.json({
          type,
          userinput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get-time":
        return res.json({
          type,
          userinput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });
      case "get-day":
        return res.json({
          type,
          userinput,
          response: `Today is ${moment().format("dddd")}`,
        });
      case "get-month":
        return res.json({
          type,
          userinput,
          response: `Current month is ${moment().format("MMMM")}`,
        });
      case "google-search":
      case "youtube-search":
      case "youtube-play":
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
      case "general":
        return res.json({
          type,
          userinput,
          response: gemResult.response || "Here's what I found.",
        });
      default:
        return res.status(400).json({ response: "I didn't understand that." });
    }
  } catch (error) {
    console.log("Error in askToAssistant:", error);
    return res
      .status(500)
      .json({ message: "Error processing assistant request" });
  }
};
