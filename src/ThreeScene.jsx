import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import Ground from "./Ground";
import Camera from "./Camera";
import ThroneRoom from "./ThroneRoom";
import Crown from "./Crown";

import "./styles.css";

const Loader = () => {
  return <div className="loading-screen">Loading Throne Room...</div>;
};

const ThreeScene = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Loader />} 
      <Canvas
        pixelRatio={window.devicePixelRatio}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}> 
          <Ground />
          <ThroneRoom 
            position={[0, 0, 20]} 
            scale={5} 
            rotation={[0, Math.PI, 0]} 
            onLoad={() => setIsLoaded(true)} 
          />

          <Crown 
            position={[20, 10, 20]} 
            scale={1.5} 
            rotation={[0, Math.PI, 0.3]} 
            onLoad={() => setIsLoaded(true)} 
          /> 

          <Camera />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <EffectComposer resolutionScale={1}>
            <Bloom 
              intensity={0.6}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>


        </Suspense>
      </Canvas>
    </>
  );
};

export default ThreeScene;
