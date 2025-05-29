import React, { useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const GLBModel = React.memo(({ url }) => {
  useGLTF.preload(url);
  const { scene } = useGLTF(url);
  const ref = useRef();

  useLayoutEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      scene.position.sub(center);
    }
  }, [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
});

export default GLBModel;
