import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Costumize2 = () => {
  const { userData, setUserData, modelFile, selectedModel, ServerUrl } =
    useContext(UserDataContext);
  const [Assistantname, setAssistantname] = useState(
    userData?.assistantName || ""
  );
  const navigate = useNavigate();
  const handleUpdateAssistant = async () => {
    try {
      const formData = new FormData();
      formData.append("assistantName", Assistantname);
      console.log("Selected Model:", selectedModel);
      console.log("Model File:", modelFile);

      // For file upload
      if (modelFile instanceof File || modelFile instanceof Blob) {
        formData.append("assistantglb", modelFile);
      } else if (selectedModel) {
        formData.append("glbURL", selectedModel); // For URLs
      }

      // Log the FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      console.log(
        "Sending request to:",
        `${ServerUrl}/api/user/updateassisment`
      );
      const result = await axios.post(
        `${ServerUrl}/api/user/updateassisment`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      setUserData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-t from-blue-900 to-black z-50 relative">
      <IoMdArrowBack
        onClick={() => window.history.back()}
        className="text-white text-xl absolute top-10 left-10 cursor-pointer"
      />
      <motion.div
        className="bg-opacity-100 bg-gray-900 rounded-xl shadow-lg p-10 w-full max-w-2xl flex flex-col items-center"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Enter your assessment name
        </motion.h1>
        <motion.input
          type="text"
          placeholder="Enter the name"
          onChange={(e) => setAssistantname(e.target.value)}
          value={Assistantname}
          className="mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md bg-white bg-opacity-80"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        {Assistantname && (
          <motion.button
            onClick={handleUpdateAssistant}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 16px 4px #60a5fa, 0 0 32px 8px #fff",
              transition: { duration: 0.2 },
            }}
            className="p-2 px-4 text-white bg-gradient-to-t from-blue-900 to-black rounded-2xl relative overflow-hidden glitter-hover transition-all duration-300"
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <span onClick={() => navigate("/sifre")} className="relative z-10">
              Create your assistant
            </span>
            {/* Glitter effect */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(96,165,250,0.3) 50%, rgba(255,255,255,0.2) 100%)",
                opacity: 0.7,
                mixBlendMode: "screen",
                filter: "blur(2px)",
                transition: "opacity 0.3s",
              }}
            />
          </motion.button>
        )}
      </motion.div>
      <style>
        {`
          .glitter-hover:hover::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
              120deg,
              rgba(255,255,255,0.25) 0px,
              rgba(255,255,255,0.25) 2px,
              transparent 2px,
              transparent 6px
            );
            opacity: 0.7;
            mix-blend-mode: screen;
            filter: blur(1.5px);
            animation: glitter-move 1s linear infinite;
            z-index: 2;
          }
          @keyframes glitter-move {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
        `}
      </style>
    </div>
  );
};

export default Costumize2;
