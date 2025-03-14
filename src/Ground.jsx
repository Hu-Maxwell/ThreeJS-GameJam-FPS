import React, { useMemo, useEffect } from 'react';

import * as THREE from 'three';

const Ground = () => {
  const texture = useMemo(() => new THREE.TextureLoader().load('/cobblestone_1.png'), []);
  
  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(10, 20); 
    }
  }, [texture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 200]} /> 
      <meshBasicMaterial 
        attach="material" 
        map={texture} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Ground;