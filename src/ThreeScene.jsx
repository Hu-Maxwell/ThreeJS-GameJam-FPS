import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { KeyboardControls} from '@react-three/drei';
 
import Player from "./Player";
import Ground from "./Ground";
import Camera from "./Camera";
import Model from './house';

import "./styles.css";


const ThreeScene = () => {
  return (
    <Canvas>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[-10, 0, -20]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[-10, 0, -12]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[-10, 0, -27]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[-10, 0, -34]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[-10, 0, -41]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}/>
      </Suspense>
      {/*right side houses */}
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[10, 0, -20]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[10, 0, -12]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[10, 0, -27]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[10, 0, -34]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
      </Suspense>
      <Suspense fallback={null}> 
        <Model scale={[0.02, 0.02, 0.02]} position={[10, 0, -41]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
      </Suspense>
      <Camera /> 
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Ground />  
    </Canvas>
  );
};

export default ThreeScene;

