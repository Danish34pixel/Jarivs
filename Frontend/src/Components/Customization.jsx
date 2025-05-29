import React, { useState, useRef, useContext, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { MdOutlineFileUpload } from "react-icons/md";
import { UserDataContext } from "../Context/UserContext";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
};

const Customization = () => {
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const navigate = useNavigate();
  const {
    ServerUrl,
    UserData,
    setUserData,
    modelFile,
    setModelFile,
    modelPreviewUrl,
    setModelPreviewUrl,
    selectedModel,
    setSelectedModel,
  } = useContext(UserDataContext);
  const inputModel = useRef(null);
  // Handle .glb file selection
  const handleModelChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setModelFile(file);
      setModelPreviewUrl(url);
      setSelectedModel(null); // Clear any pre-selected model
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 p-6">
      {" "}
      {/* Upload Button */}
      {!modelPreviewUrl && !selectedModel && (
        <button
          className="absolute bottom-8 right-8 flex items-center gap-2 text-lg sm:text-xl px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-black hover:from-blue-700 hover:to-blue-900 text-white shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Upload"
          onClick={() => inputModel.current.click()}
          type="button"
        >
          <MdOutlineFileUpload className="text-2xl" />
          <input
            type="file"
            accept=".glb"
            ref={inputModel}
            hidden
            onChange={handleModelChange}
          />
          Upload 3D Model
        </button>
      )}{" "}
      {/* 3D Model Preview */}
      {(modelPreviewUrl || selectedModel) && (
        <div
          onClick={() => setSelectedModel(modelPreviewUrl || selectedModel)}
          className="flex justify-center items-center mt-6 absolute right-45 bottom-20 border-blue-500/20"
          style={{ width: 320, height: 320 }}
        >
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <ModelViewer modelUrl={modelPreviewUrl || selectedModel} />
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>
      )}
      {/* File Info */}
      {modelFile && (
        <div className="mt-4 text-white">
          <p className="text-sm">Selected model:</p>
          <p className="font-semibold">{modelFile.name}</p>
        </div>
      )}
      {/* Card component or other customization UI */}
      <div className="mt-8">
        <Card />
        <button
          onClick={() => navigate("/cos")}
          className="p-2 bg-red-900 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customization;
