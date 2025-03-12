import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200]} /> {/* args: height width*/}
      <meshBasicMaterial color={0x228B22} side={THREE.DoubleSide} /> 
    </mesh>
  );
};

export default Ground;