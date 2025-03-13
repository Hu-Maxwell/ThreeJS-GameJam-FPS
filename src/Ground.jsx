import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 200]} /> {/* args: width height (actually height width but it's rotated)*/}
      <meshBasicMaterial color={0x228B22} side={THREE.DoubleSide} /> 
    </mesh>
  );
};

export default Ground;