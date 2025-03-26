import { useMemo, useEffect } from 'react';

import * as THREE from 'three';

const Ground = ({ setGroundLoaded }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load('/cobblestone_1.png'), []);
  
  useEffect(() => {
    if (texture) {
      setGroundLoaded && setGroundLoaded(true);
    }
  }, [texture, setGroundLoaded]);


  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10, 20); 
      texture.needsUpdate = true;
    }
  }, [texture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 150]} /> 
      <meshBasicMaterial 
        attach="material" 
        map={texture} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Ground;

