import React, { useState, useRef, useMemo, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';

import Player from "./Player";
import Ground from "./Ground";
import Camera from "./Camera";

import "./styles.css";

const ThreeScene = () => {
  let [camPosX, setCamPosX] = useState(); 

  const getCamPosX = (newX) => {
    setCamPosX(newX); 
  }

  return (
    <Canvas style={{ display: 'block', width: '1904px', height: '550px' }}>
      <Camera camPosX={camPosX} /> 
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Ground /> 
      <Player setCamPosX={setCamPosX}/> {/* pass callback function in. this is the function used */}
    </Canvas>
  );
};

export default ThreeScene;
