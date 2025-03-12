import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial color={0x228B22} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Player = () => {
  const playerRef = useRef();

  const texture = useMemo(() => new THREE.TextureLoader().load('/billyman.png'), []);

  // keyboard
  useEffect(() => {
    const onKeyDown = (event) => {
      const moveDistance = 0.5;

      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          playerRef.current.position.z -= moveDistance;
          break;
        case 'ArrowDown':
        case 'KeyS':
          playerRef.current.position.z += moveDistance;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          playerRef.current.position.x -= moveDistance;
          break;
        case 'ArrowRight':
        case 'KeyD':
          playerRef.current.position.x += moveDistance;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <sprite ref={playerRef} scale={[2, 2, 1]} position={[0, 1, 0]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
};

const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Ground />
      <Player />
    </Canvas>
  );
};

export default ThreeScene;
