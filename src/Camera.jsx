import { useState, useEffect } from "react"; 

import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';


// pass camera x pos as prop in 
const Camera = ({ camPosX }) => {

  return (
    <PerspectiveCamera 
      makeDefault
      position={[camPosX, 35, 150]} 
      fov={35} />
  );
};

export default Camera;