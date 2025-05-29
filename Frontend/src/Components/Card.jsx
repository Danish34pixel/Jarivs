import React, { useContext, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { UserDataContext } from "../Context/UserContext";

// Preload all models
const preloadModels = [
  "/Airobots/Cyber_Sentinel_0521060201_texture.glb",
  "/Airobots/Futuristic_Android_in_0521110720_texture.glb",
  "/Airobots/Cyber_Guardian_0521111303_texture.glb",
  "/Airobots/Neon_Sentinel_0521111637_texture.glb",
];

preloadModels.forEach((path) => {
  useGLTF.preload(path);
});

// Reusable component to render a GLB model
const ModelPreview = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = React.useMemo(() => {
    return scene.clone();
  }, [scene]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (clonedScene) {
        clonedScene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (object.material.length) {
              for (const material of object.material) material.dispose();
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [clonedScene]);

  return <primitive object={clonedScene} scale={1.5} />;
};

const Card = () => {
  const {
    selectedModel,
    setSelectedModel,
    setUploadedModel,
    setModelFile,
    setModelPreviewUrl,
  } = useContext(UserDataContext);

  // Replace images with GLB models
  const models = [
    {
      path: "/Airobots/Cyber_Sentinel_0521060201_texture.glb",
      title: "Cyber Assistant 1",
    },
    {
      path: "/Airobots/Futuristic_Android_in_0521110720_texture.glb",
      title: "Cyber Assistant 2",
    },
    {
      path: "/Airobots/Cyber_Guardian_0521111303_texture.glb",
      title: "Cyber Assistant 3",
    },
    {
      path: "/Airobots/Cyber_Sentinel_0521060201_texture.glb",
      title: "Cyber Assistant 4",
    },
    {
      path: "/Airobots/Neon_Sentinel_0521111637_texture.glb",
      title: "Cyber Assistant 5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {models.map((model, index) => (
        <div
          key={index}
          className={`group relative bg-gradient-to-b from-blue-900/30 to-black/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border backdrop-blur-sm ${
            selectedModel === model.path
              ? "border-2 border-white"
              : "border-blue-500/20"
          }`}
          onClick={() => {
            setSelectedModel(model.path);
            setModelFile(null);
            setModelPreviewUrl(null);
            setUploadedModel(null);
          }}
        >
          {" "}
          <div className="relative aspect-square">
            {" "}
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{
                preserveDrawingBuffer: true,
                powerPreference: "high-performance",
                antialias: false, // Disable antialiasing for better performance
              }}
              dpr={1} // Fixed pixel ratio for consistent performance
              frameloop="demand" // Only render when needed
              performance={{ min: 0.5 }} // Allow frame rate to drop for better stability
              onContextLost={(event) => {
                event.preventDefault();
                console.warn("WebGL context lost. Attempting to restore...");
              }}
              onContextRestored={() => {
                console.log("WebGL context restored");
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <Suspense fallback={null}>
                <ModelPreview modelPath={model.path} />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                  autoRotate
                  autoRotateSpeed={1}
                  enableDamping={false} // Disable damping for better performance
                />
              </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white text-lg font-bold mb-2">{model.title}</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full">
              Select Assistant
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
