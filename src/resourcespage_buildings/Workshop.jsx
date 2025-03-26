import { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Workshop = (props) => {
  const group = useRef();
  
  const { scene: originalScene, animations } = useGLTF('/workshopbuilding/scene.gltf');
  
  const scene = useMemo(() => {
    const clonedScene = originalScene.clone(true);
    
    clonedScene.traverse((node) => {
      if (node.isMesh && node.material) {
        if (Array.isArray(node.material)) {
          node.material = node.material.map(mat => mat.clone());
        } else {
          node.material = node.material.clone();
        }
      }
      
      if (node.isSkinnedMesh) {
        node.bindMatrix = node.bindMatrix.clone();
        node.bindMatrixInverse = node.bindMatrixInverse.clone();
        
        if (node.skeleton) {
          const newBones = [];
          const originalBones = node.skeleton.bones;
          
          originalBones.forEach((bone) => {
            const clonedBone = clonedScene.getObjectByName(bone.name);
            if (clonedBone) {
              newBones.push(clonedBone);
            }
          });
          
          if (newBones.length > 0) {
            node.skeleton = new THREE.Skeleton(newBones, node.skeleton.boneInverses.map(m => m.clone()));
          }
        }
      }
    });
    
    return clonedScene;
  }, [originalScene]);
  
  const { actions, mixer } = useAnimations(animations, group);
  
  useFrame((_, delta) => {
    if (mixer) mixer.update(delta);
  });
  
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;
    
    const animationName =
      actions.Animation ? 'Animation' :  
      actions['0'] ? '0' :               
      Object.keys(actions)[0];          
    
    if (animationName && actions[animationName]) {
      if (props.autoPlay !== false) {
        mixer.stopAllAction();
        const action = actions[animationName];
        action.reset();
        action.setLoop(THREE.LoopRepeat);
        action.clampWhenFinished = false;
        action.play();
      }
    } else {
      console.warn('Animation not found in:', Object.keys(actions));
    }
    
    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [actions, mixer, props.autoPlay]);
  
  useEffect(() => {
    if (!group.current || !mixer || !actions) return;
    
    const getAnimName = () => {
      return actions.Animation ? 'Animation' :
             actions['0'] ? '0' :
             Object.keys(actions)[0];
    };
    
    group.current.playAnimation = () => {
      const name = getAnimName();
      if (name && actions[name]) {
        mixer.stopAllAction();
        actions[name].reset().play();
        return true;
      }
      return false;
    };
    
    group.current.stopAnimation = () => {
      mixer.stopAllAction();
    };
    
    group.current.pauseAnimation = () => {
      Object.values(actions).forEach(action => {
        if (action.isRunning()) action.paused = true;
      });
    };
    
    group.current.resumeAnimation = () => {
      Object.values(actions).forEach(action => {
        if (action.paused) action.paused = false;
      });
    };
    
  }, [actions, mixer]);
  
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

export default Workshop;

useGLTF.preload('/workshopbuilding/scene.gltf');