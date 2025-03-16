import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// this is when the crown is slightly tilted
// const initialRotation = new THREE.Euler(0, Math.PI, 0.3); 
const initialRotation = new THREE.Euler(0, Math.PI, 0); 
const rotationAxis = new THREE.Vector3(0, 1, 0).normalize(); 

const Crown = (props) => {
  const { scene } = useGLTF('/crown2/untitled.gltf', true); 
  const crownRef = useRef();

  useEffect(() => {
    if (scene && props.onLoad) {
      props.onLoad();
    }

    if (crownRef.current) {
      crownRef.current.rotation.copy(initialRotation);
    }
  }, [scene, props.onLoad]);

  const yellowMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 
        scene.children[0].material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
      scene.children[0].castShadow = true;
      scene.children[0].receiveShadow = true;


  useFrame(() => {
    if (crownRef.current) {
      crownRef.current.rotateOnAxis(rotationAxis, 0.01);
    }
  });

  return <primitive ref={crownRef} object={scene} {...props} />;
};

export default Crown;
