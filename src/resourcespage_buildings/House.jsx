import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const House = (props) => {
  const { nodes, materials } = useGLTF('/house/scene.gltf')
  const groupRef = useRef()
  
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fantasy_House_6_Fantasy_House_6_0.geometry}
        material={materials.Fantasy_House_6}
      />
    </group>
  )
}

export default House

useGLTF.preload('/house/scene.gltf')
