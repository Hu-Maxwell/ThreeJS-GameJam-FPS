import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const ThroneRoom = (props) => {
  const { scene } = useGLTF('/throne_room/scene.gltf', true); 

  useEffect(() => {
    if (scene && props.onLoad) {
      props.onLoad(); 
    }
  }, [scene, props.onLoad]); 

  return <primitive object={scene} {...props} />;
};

export default ThroneRoom;
