/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/viruses/hpv_100.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes["3j6rcif_assembly_1_B_Gaussian_surface"].material}
        geometry={nodes["3j6rcif_assembly_1_B_Gaussian_surface"].geometry}
      />
      <mesh
        material={nodes["3j6rcif_assembly_1_A_Gaussian_surface"].material}
        geometry={nodes["3j6rcif_assembly_1_A_Gaussian_surface"].geometry}
      />
      <mesh
        material={nodes["3j6rcif_assembly_1_E_Gaussian_surface"].material}
        geometry={nodes["3j6rcif_assembly_1_E_Gaussian_surface"].geometry}
      />
      <mesh
        material={nodes["3j6rcif_assembly_1_D_Gaussian_surface"].material}
        geometry={nodes["3j6rcif_assembly_1_D_Gaussian_surface"].geometry}
      />
      <mesh
        material={nodes["3j6rcif_assembly_1_C_Gaussian_surface"].material}
        geometry={nodes["3j6rcif_assembly_1_C_Gaussian_surface"].geometry}
      />
      <mesh
        material={nodes["3j6rcif_assembly_1_F_Gaussian_surface"].material}
        geometry={nodes["3j6rcif_assembly_1_F_Gaussian_surface"].geometry}
      />
    </group>
  );
}

// useGLTF.preload("/models/viruses/hpv_100.glb");