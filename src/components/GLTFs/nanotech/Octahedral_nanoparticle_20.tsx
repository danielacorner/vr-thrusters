/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/nanotech/octahedral_nanoparticle_20.glb') as any
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes['6vficif_assembly_1_B_Gaussian_surface'].material}
        geometry={nodes['6vficif_assembly_1_B_Gaussian_surface'].geometry}
      />
      <mesh
        material={nodes['6vficif_assembly_1_A_Gaussian_surface'].material}
        geometry={nodes['6vficif_assembly_1_A_Gaussian_surface'].geometry}
      />
    </group>
  )
}

useGLTF.preload('/models/nanotech/octahedral_nanoparticle_20.glb')
