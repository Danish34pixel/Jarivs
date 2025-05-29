import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import GLBModel from "./GLBModel";

const ModelCanvas = ({ assistantglb }) => (
  <div className="w-full h-screen relative z-10">
    {assistantglb ? (
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <spotLight position={[-100, 10, 10]} angle={0.2} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <Suspense fallback={<Html center>Loading hologram...</Html>}>
          <GLBModel url={assistantglb} />
          <OrbitControls enableZoom enablePan enableRotate />
        </Suspense>
      </Canvas>
    ) : (
      <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black/70 p-4">
        No assistant model available. Please upload a GLB file in your settings.
      </div>
    )}
  </div>
);

export default ModelCanvas;
