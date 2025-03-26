import { useThree } from '@react-three/fiber';
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei';

import useResizeCamera from './hooks/useResizeCamera';
import useKeyboardMovement from './hooks/useKeyboardMovement';
import useScrollCamera from './hooks/useScrollCamera';
import useCinematicIntro from './hooks/useCinematicIntro';
import useResourcesScrollCamera from './hooks/useResourcesScrollCamera';

export const Camera = () => {
  const { camera, gl } = useThree();

  useResizeCamera(camera, gl);
  useKeyboardMovement(camera);
  useScrollCamera(camera);
  // useCinematicIntro(camera);

  return (
    <PerspectiveCamera makeDefault position={[0, 5, 0]} fov={85}>
      <PointerLockControls />
    </PerspectiveCamera>
  );
};

export const ResourcesCamera = () => {
  const { camera, gl } = useThree();

  useResizeCamera(camera, gl);
  useKeyboardMovement(camera);
  useResourcesScrollCamera(camera);
  // useCinematicIntro(camera);

  return (
    <PerspectiveCamera makeDefault position={[0, 5, 0]} fov={85}>
      <PointerLockControls />
    </PerspectiveCamera>
  );
}
