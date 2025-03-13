import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';



const Player = ({ setCamPosX }) => {
  // useRef is so the component does not rerender every single time player moves - only player
  const playerRef = useRef();
  const texture = useMemo(() => new THREE.TextureLoader().load('/billyman.png'), []);

  useFrame(() => {
    if (playerRef.current) {
      setCamPosX(playerRef.current.position.x);
    }
  });

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

export default Player;