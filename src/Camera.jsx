import { useState, useEffect } from "react"; 
import { useThree } from "@react-three/fiber";

import { PerspectiveCamera } from '@react-three/drei';
import { PointerLockControls } from '@react-three/drei';


// pass camera x pos as prop in 
const Camera = () => {
  const { camera, gl } = useThree(); 

  useEffect(() => {
    const handleResize = () => {
      console.log("hello");
      console.log(window.innerWidth);
      const width = window.innerWidth; 
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      gl.setSize(width, height);
      gl.setPixelRatio(window.devicePixelRatio); 
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // call on run so aspect is initialized

    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  return (
    <PerspectiveCamera 
      makeDefault
      position={[0, 5, 0]} 
      fov={35} >
      <PointerLockControls />
    </PerspectiveCamera>
  );
};

export default Camera;