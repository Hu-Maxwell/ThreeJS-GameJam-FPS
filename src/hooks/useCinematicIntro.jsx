import { useEffect } from 'react';
import { gsap } from 'gsap';

import { CINEMATIC_START_POS, CINEMATIC_FINAL_POS } from '../utils/constants';

// cinematic intro
const useCinematicIntro = (camera) => {
  useEffect(() => {
    camera.position.copy(CINEMATIC_START_POS);
    gsap.to(camera.position, {
      duration: 3,
      x: CINEMATIC_FINAL_POS.x,
      y: CINEMATIC_FINAL_POS.y,
      z: CINEMATIC_FINAL_POS.z,
      ease: 'power2.inOut',
    });
  }, [camera]);
}

export default useCinematicIntro