import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import Ground from "./Ground";
import ThroneRoom from "./ThroneRoom";
import Crown from "./Crown";

import "./styles.css";
import ResourcesScene from './resourcespage_scene/ResourcesScene';
import { Camera } from './Camera';

const Loader = ({ currentScene }) => {
  switch (currentScene) {
    case "throne":
      return <div className="loading-screen">Loading Throne Room...</div>;
    case "resources":
      return <div className="loading-screen">Loading Resources Scene...</div>;
    default:
      console.log("Error")
  }
};
 
const ThreeScene = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groundLoaded, setGroundLoaded] = useState(false);
  const [currentScene, setCurrentScene] = useState('resources')

  useEffect(() => {
    setIsLoaded(false)
    setGroundLoaded(false)
  }, [currentScene])

  return (
    <>
      {!isLoaded && !groundLoaded && <Loader currentScene={currentScene}/>} 
      <Canvas
        pixelRatio={window.devicePixelRatio}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}> 
          {currentScene === "throne" ? (
              <>
                <Ground setGroundLoaded={setGroundLoaded}/>
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

                  setCurrentScene={setCurrentScene}
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
              </>
          ) : currentScene === "resources" && (
            <ResourcesScene setGroundLoaded={setGroundLoaded} setCurrentScene={setCurrentScene}/>
          )}


        </Suspense>
      </Canvas>
    </>
  );
};

export default ThreeScene;
