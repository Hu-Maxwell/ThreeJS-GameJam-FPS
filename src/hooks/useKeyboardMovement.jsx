import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SPEED } from '../utils/constants';

const useKeyboardMovement = (camera) => {
  const velocity = useRef(new THREE.Vector3());
  const keys = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyW') keys.current.forward = true;
      if (e.code === 'KeyS') keys.current.backward = true;
      if (e.code === 'KeyA') keys.current.left = true;
      if (e.code === 'KeyD') keys.current.right = true;
    };

    const handleKeyUp = (e) => {
      if (e.code === 'KeyW') keys.current.forward = false;
      if (e.code === 'KeyS') keys.current.backward = false;
      if (e.code === 'KeyA') keys.current.left = false;
      if (e.code === 'KeyD') keys.current.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up);

    velocity.current.set(0, 0, 0);

    if (keys.current.forward) velocity.current.addScaledVector(forward, SPEED);
    if (keys.current.backward) velocity.current.addScaledVector(forward, -SPEED);
    if (keys.current.right) velocity.current.addScaledVector(right, SPEED);
    if (keys.current.left) velocity.current.addScaledVector(right, -SPEED);

    camera.position.add(velocity.current);
  });
};

export default useKeyboardMovement;
