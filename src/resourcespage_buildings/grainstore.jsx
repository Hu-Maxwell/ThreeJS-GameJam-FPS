import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Grainstore = (props) => {
  const { nodes, materials } = useGLTF('/grainstorebuilding/scene.gltf')
  const groupRef = useRef()
  
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GrainStore_M_grainstore_0.geometry}
        material={materials.M_grainstore}
      />
    </group>
  )
}

export default Grainstore

useGLTF.preload('/grainstorebuilding/scene.gltf')
