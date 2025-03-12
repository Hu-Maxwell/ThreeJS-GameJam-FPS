import React, { useRef, useMemo, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';

import Player from "./Player";
import Ground from "./Ground";
import Camera from "./Camera";

import "./styles.css";

const ThreeScene = () => {
  return (
    <Canvas>
      <Camera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Ground />
      <Player />
    </Canvas>
  );
};

export default ThreeScene;
