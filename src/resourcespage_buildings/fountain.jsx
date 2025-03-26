import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Fountain = (props) => {
  const { scene, nodes, materials } = useGLTF('/fountain/scene.gltf')
  const groupRef = useRef()
  
  return (
    <group ref={groupRef} {...props} dispose={null}>
        <primitive object={scene} />
    </group>
  )
}

export default Fountain

useGLTF.preload('/fountain/scene.gltf')
