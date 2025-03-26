import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Lamp = (props) => {
  const { nodes, materials } = useGLTF('/lamp/scene.gltf')
  const groupRef = useRef()
  
  return (
    <group ref={groupRef} {...props} dispose={null}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006_TorchNice_0.geometry}
            material={materials.TorchNice}
        />
    </group>
  )
}

export default Lamp

useGLTF.preload('/lamp/scene.gltf')
