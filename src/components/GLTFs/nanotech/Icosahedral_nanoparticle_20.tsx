/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/nanotech/icosahedral_nanoparticle_20.glb"
  ) as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-218.94, -186.88, -207.47]}>
        <mesh
          material={
            nodes.icosahedral_nanoparticlecif_assembly_1_A_Gaussian_surface
              .material
          }
          geometry={
            nodes.icosahedral_nanoparticlecif_assembly_1_A_Gaussian_surface
              .geometry
          }
        />
        <mesh
          material={
            nodes.icosahedral_nanoparticlecif_assembly_1_B_Gaussian_surface
              .material
          }
          geometry={
            nodes.icosahedral_nanoparticlecif_assembly_1_B_Gaussian_surface
              .geometry
          }
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/nanotech/icosahedral_nanoparticle_20.glb");
