import { useEffect } from 'react';
import { gsap } from 'gsap';
import { THRONE_FINAL_POS, CROWN_FINAL_POS } from '../utils/constants';

const useScrollCamera = (camera) => {
  useEffect(() => {
    let scrollProgress = 0;
    const maxScrollPerPhase = 1000; 
    const maxScroll = maxScrollPerPhase * 2; 
    const initialPosition = { 
      x: camera.position.x, 
      y: camera.position.y, 
      z: camera.position.z 
    };

    const handleWheel = (event) => {
      scrollProgress += event.deltaY;
      scrollProgress = Math.max(0, Math.min(scrollProgress, maxScroll)); 

      let progress;
      let targetPosition;

      if (scrollProgress <= maxScrollPerPhase) {
        progress = scrollProgress / maxScrollPerPhase;
        targetPosition = THRONE_FINAL_POS;
      } else {
        progress = (scrollProgress - maxScrollPerPhase) / maxScrollPerPhase;
        targetPosition = CROWN_FINAL_POS;
      }

      const startPosition = scrollProgress <= maxScrollPerPhase ? initialPosition : THRONE_FINAL_POS;

      const newX = startPosition.x + progress * (targetPosition.x - startPosition.x);
      const newY = startPosition.y + progress * (targetPosition.y - startPosition.y);
      const newZ = startPosition.z + progress * (targetPosition.z - startPosition.z);

      gsap.to(camera.position, {
        duration: 0.2,
        x: newX,
        y: newY,
        z: newZ,
        ease: 'power2.out'
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera]);

};

export default useScrollCamera;
