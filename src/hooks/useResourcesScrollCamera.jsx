import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
    RESOURCE_SCENE_START_POS, 
    RESOURCE_SCENE_FINAL_POS, 
    WORKSHOP_FINAL_POS,       
    GAME_ENGINE_FINAL_POS,
    SOUND_TOOL_FINAL_POS,
    ART_TOOLS_FINAL_POS
} from '../utils/constants';
import * as THREE from 'three';

const useResourcesScrollCamera = (camera) => {
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    const targetQuaternion = useRef(new THREE.Quaternion());
    const initialQuaternion = useRef(new THREE.Quaternion());
    const rotationProgress = useRef(0);
    const isRotating = useRef(false);
    const isPaused = useRef(false);
    const pendingPosition = useRef(null);
    
    const scrollProgress = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const scrollAnimation = useRef(null);
    const scrollDirection = useRef(0);

    useEffect(() => {
        const cameraPositions = [
            RESOURCE_SCENE_START_POS, 
            WORKSHOP_FINAL_POS,        
            RESOURCE_SCENE_START_POS,  
            GAME_ENGINE_FINAL_POS,     
            RESOURCE_SCENE_START_POS, 
            SOUND_TOOL_FINAL_POS,    
            RESOURCE_SCENE_START_POS, 
            ART_TOOLS_FINAL_POS,      
            RESOURCE_SCENE_FINAL_POS
        ];

        const cameraDirections = [      
            new THREE.Vector3(0, 0, 0), 
            new THREE.Vector3(0, 0, -1), 
            new THREE.Vector3(-1, 0, 0), 
            new THREE.Vector3(1, 0, 0), 
            new THREE.Vector3(1, 0, 0), 
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 1, 1),
        ];

        const maxScrollPerTransition = 500; 
        const totalTransitions = cameraPositions.length - 1;
        const maxScroll = maxScrollPerTransition * totalTransitions;

        const updateCameraRotation = () => {
            if (!isRotating.current) return;
            
            camera.quaternion.slerpQuaternions(
                initialQuaternion.current,
                targetQuaternion.current,
                rotationProgress.current
            );
            
            rotationProgress.current += 0.02;
            
            if (rotationProgress.current >= 1) {
                rotationProgress.current = 1;
                isRotating.current = false;
                isPaused.current = false;
                
                if (pendingPosition.current) {
                    moveCameraToPosition(pendingPosition.current);
                    pendingPosition.current = null;
                }
            }
            
            if (isRotating.current) {
                requestAnimationFrame(updateCameraRotation);
            }
        };
        
        const rotateCameraTo = (direction) => {
            if (direction.lengthSq() === 0) return;
            
            isPaused.current = true;
            initialQuaternion.current.copy(camera.quaternion);
            
            const dummyObject = new THREE.Object3D();
            dummyObject.position.copy(camera.position);
            
            const target = new THREE.Vector3().copy(camera.position).add(direction);
            dummyObject.lookAt(target);
            
            targetQuaternion.current.copy(dummyObject.quaternion);
            
            rotationProgress.current = 0;
            isRotating.current = true;
            requestAnimationFrame(updateCameraRotation);
        };

        const moveCameraToPosition = (position) => {
            if (scrollAnimation.current) {
                scrollAnimation.current.kill();
            }
            
            scrollAnimation.current = gsap.to(camera.position, {
                duration: 0.5,
                x: position.x,
                y: position.y,
                z: position.z,
                ease: 'power2.out',
                onComplete: () => {
                    scrollAnimation.current = null;
                }
            });
        };

        const calculatePosition = (scrollValue) => {
            const transitionIndex = Math.floor(scrollValue / maxScrollPerTransition);
            const progressInTransition = (scrollValue - (transitionIndex * maxScrollPerTransition)) / maxScrollPerTransition;
            
            const startPosition = cameraPositions[transitionIndex];
            const targetPosition = cameraPositions[transitionIndex + 1];
            
            return {
                x: startPosition.x + progressInTransition * (targetPosition.x - startPosition.x),
                y: startPosition.y + progressInTransition * (targetPosition.y - startPosition.y),
                z: startPosition.z + progressInTransition * (targetPosition.z - startPosition.z),
                transitionIndex,
                progressInTransition
            };
        };

        const handleWheel = (event) => {
            const currentDirection = Math.sign(event.deltaY);
            
            // Delay for reducing jitter
            if (currentDirection !== 0 && scrollDirection.current !== 0 && 
                currentDirection !== scrollDirection.current) {
                if (Date.now() - lastScrollTime.current < 150) {
                    return;
                }
            }
            
            scrollDirection.current = currentDirection;
            lastScrollTime.current = Date.now();
            
            const scrollDelta = Math.min(Math.max(-40, event.deltaY), 40); 
            scrollProgress.current = Math.max(0, Math.min(scrollProgress.current + scrollDelta, maxScroll));
            
            const { 
                x, y, z, 
                transitionIndex, 
                progressInTransition 
            } = calculatePosition(scrollProgress.current);
            
            const newPosition = { x, y, z };
            
            const rotationThreshold = 0.1;
            if ((progressInTransition < rotationThreshold || progressInTransition > (1 - rotationThreshold)) && 
                !isRotating.current && !isPaused.current) {
                
                const targetDirection = (progressInTransition < rotationThreshold) 
                    ? cameraDirections[transitionIndex]
                    : cameraDirections[transitionIndex + 1];
                
                rotateCameraTo(targetDirection);
                pendingPosition.current = newPosition;
                return;
            }
            
            if (isRotating.current || isPaused.current) {
                pendingPosition.current = newPosition;
                return;
            }
            
            moveCameraToPosition(newPosition);
            
            setCurrentPositionIndex(transitionIndex);
        };

        // 60 fps limit for wheel
        let wheelTimeout;
        const throttledWheel = (event) => {
            if (!wheelTimeout) {
                wheelTimeout = setTimeout(() => {
                    handleWheel(event);
                    wheelTimeout = null;
                }, 16);
            }
        };

        const initialDirection = cameraDirections[0];
        if (initialDirection.lengthSq() > 0) {
            const initialTarget = new THREE.Vector3().copy(camera.position).add(initialDirection);
            camera.lookAt(initialTarget);
        }

        window.addEventListener('wheel', throttledWheel, { passive: true });
        
        return () => {
            window.removeEventListener('wheel', throttledWheel);
            if (scrollAnimation.current) {
                scrollAnimation.current.kill();
            }
        };
    }, [camera]);

    return { currentPositionIndex };
};

export default useResourcesScrollCamera;