import { useState, useEffect, useRef } from "react"; 
import { useThree, useFrame } from "@react-three/fiber";

import { PerspectiveCamera } from '@react-three/drei';
import { PointerLockControls, useKeyboardControls, KeyboardControls } from '@react-three/drei';
import * as THREE from "three";

const SPEED = .1;

// pass camera x pos as prop in 
const Camera = () => {
  const { camera, gl } = useThree(); 

  // =================================
  // page setup 

  useEffect(() => {
    const handleResize = () => {
      console.log("hello");
      console.log(window.innerWidth);
      const width = window.innerWidth; 
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      gl.setSize(width, height);
      gl.setPixelRatio(window.devicePixelRatio); 
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // call on run so aspect is initialized

    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  // =================================
  // movement

  const velocity = useRef(new THREE.Vector3()); 
  
  // when a key is true, it will move accordingly. 
  // if forward is true, it will move forward 
  const keys = useRef({ 
    forward: false, 
    backward: false, 
    left: false, 
    right: false 
  });

  // handles the key up and key down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyW") {
        keys.current.forward = true;
      } 
      if (e.code === "KeyS") {
        keys.current.backward = true;
      } 
      if (e.code === "KeyA") {
        keys.current.left = true; 
      } 
      if (e.code === "KeyD") {
        keys.current.right = true; 
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "KeyW") {
        keys.current.forward = false;
      } 
      if (e.code === "KeyS") {
        keys.current.backward = false;
      } 
      if (e.code === "KeyA") {
        keys.current.left = false; 
      } 
      if (e.code === "KeyD") {
        keys.current.right = false; 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);


  useFrame(() => {
    // get forward vector (for w, s) 
    let forward = new THREE.Vector3();
    camera.getWorldDirection(forward); // this is the default looking forward direction
    forward.y = 0; // looks straight forward instead of up and down

    // get right vector (for a, d)
    const right = new THREE.Vector3();
    // have to calculate a DYNAMIC right direction. this means you will have to take the forward vector
    // and then derive the right vector from it. so i'm using a cross product to constantly be updating it 
    right.crossVectors(forward, camera.up); 

    // LOL remove this line and see what happens
    velocity.current.set(0, 0, 0);

    // if movement forward / back / right / left
    if (keys.current.forward) {
      velocity.current.addScaledVector(forward, SPEED);
    } 
    if (keys.current.backward) {
      velocity.current.addScaledVector(forward, -SPEED);
    } 
    if (keys.current.right) {
      velocity.current.addScaledVector(right, SPEED);
    }
    if (keys.current.left) {
      velocity.current.addScaledVector(right, -SPEED);
    } 

    camera.position.add(velocity.current);

    return null; 
  });


  return (
    <PerspectiveCamera 
      makeDefault
      position={[0, 5, 0]} 
      fov={35} >
      <PointerLockControls />
    </PerspectiveCamera>
  );
};

export default Camera;