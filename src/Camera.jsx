import { PerspectiveCamera } from '@react-three/drei';

const Camera = () => {
  return (

    <PerspectiveCamera 
      makeDefault
      position={[0, 5, 10]} 
      fov={45} />
  );
};

export default Camera;