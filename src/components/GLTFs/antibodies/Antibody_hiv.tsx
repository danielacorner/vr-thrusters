/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/antibodies/antibody_hiv.glb"
  ) as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes["3rpicif_assembly_1_L_SES_surface"].material}
        geometry={nodes["3rpicif_assembly_1_L_SES_surface"].geometry}
      />
      <mesh
        material={nodes["3rpicif_assembly_1_H_SES_surface"].material}
        geometry={nodes["3rpicif_assembly_1_H_SES_surface"].geometry}
      />
    </group>
  );
}

useGLTF.preload("/models/antibodies/antibody_hiv.glb");
