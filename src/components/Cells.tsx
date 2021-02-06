import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import { Html, useGLTF } from "@react-three/drei";
import { PROTEINS } from "../utils/PROTEINS";
import { SingleParticleMounted } from "./particle/SingleParticleMounted";
import HUD from "./HUD";
import { useWindowSize } from "../utils/hooks";
import { useControl } from "react-three-gui";
import styled from "styled-components/macro";

const antibody_hiv = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-HIV Antibody"
);
const antibody_hpv = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-HPV Antibody"
);
const antibody_herpes = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-Herpes Antibody"
);
const antibody_poliovirus = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-Poliovirus Antibody"
);

const CELLS = [
  { Component: Lymphocyte, antibody: antibody_poliovirus },
  { Component: Monocyte, antibody: antibody_hpv },
  // { Component: DendriticCell, antibody: antibody_hiv },
  { Component: Eosinophil, antibody: antibody_herpes },
  { Component: Basophil, antibody: antibody_hiv },
  // { Component: Macrophages, antibody: antibody_herpes },
];
const SCALE = 0.2;

/** onClick, generates an antibody? */
export default function Cells() {
  const currentWave = useStore((s) => s.currentWave);
  console.log("🌟🚨 ~ {CELLS.map ~ CELLS", CELLS);

  const { width, height } = useWindowSize();
  // const x = useControl("HUDx", {
  //   type: "number",
  //   min: -100,
  //   max: 100,
  //   value: 0,
  // });
  // const y = useControl("HUDy", {
  //   type: "number",
  //   min: -100,
  //   max: 100,
  //   value: 0,
  // });
  // const z = useControl("HUDz", {
  //   type: "number",
  //   min: -100,
  //   max: 100,
  //   value: 0,
  // });
  // const cx = useControl("CELLSx", {
  //   type: "number",
  //   min: -Math.PI,
  //   max: Math.PI,
  //   value: 0,
  // });
  // const cy = useControl("CELLSy", {
  //   type: "number",
  //   min: -Math.PI,
  //   max: Math.PI,
  //   value: 0,
  // });
  // const cz = useControl("CELLSz", {
  //   type: "number",
  //   min: -Math.PI,
  //   max: Math.PI,
  //   value: 0,
  // });

  const cellsFiltered = CELLS.filter(
    (_, idx) => idx === 0 || currentWave > idx
  );

  return (
    <>
      <HUD position={[0, 0, 0]}>
        {cellsFiltered.map((cellProps, idx) => {
          // const y = height * 0.75;
          // const z = 15;
          const CELLS_GAP = 3;
          const position = [
            CELLS_GAP * (idx - (cellsFiltered.length - 1) / 2),
            0,
            0,
          ];
          return (
            <>
              <Cell {...{ ...cellProps, position, key: idx }} />
            </>
          );
        })}
      </HUD>
    </>
  );
}
const ClickListenerStyles = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: -100px;
  left: -50px;
`;

function Cell({ Component: CellComponent, antibody, position }) {
  return (
    <>
      <CreatesAntibodies
        {...{
          CellComponent,
          antibody,
        }}
        position={position}
      />
      <spotLight
        position={[position[0], position[1] + 2, position[2]]}
        angle={0.2}
        penumbra={0.5}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
    </>
  );
}

function CreatesAntibodies({ CellComponent, position, antibody }) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const createAntibody = useStore((s) => s.createAntibody);

  useEffect(() => {
    let intervalCreateABs;
    if (isPointerDown) {
      createAntibody(antibody);
      intervalCreateABs = window.setInterval(() => {
        createAntibody(antibody);
      }, 100);
    }
    return () => {
      if (intervalCreateABs) {
        window.clearInterval(intervalCreateABs);
      }
    };
  }, [isPointerDown, createAntibody, antibody]);

  return (
    <>
      <Html>
        <ClickListenerStyles
          onPointerDown={() => setIsPointerDown(true)}
          onPointerLeave={() => setIsPointerDown(false)}
          onPointerUp={() => setIsPointerDown(false)}
        />
      </Html>
      <CellComponent
        onPointerDown={() => setIsPointerDown(true)}
        onPointerLeave={() => setIsPointerDown(false)}
        onPointerUp={() => setIsPointerDown(false)}
        scale={[SCALE, SCALE, SCALE]}
        {...{ position }}
      />
    </>
  );
}

/**
 * Dendritic cells are known as the most efficient antigen-presenting cell type with the ability to interact with T cells and initiate an immune response.  Dendritic cells are receiving increasing scientific and clinical interest due to their key role in the immune response and potential use with tumor vaccines.
 */
// function DendriticCell(props) {
//   return (
//     <mesh {...props}>
//       <sphereGeometry />
//       <meshLambertMaterial color={props.color} />
//     </mesh>
//   );
// }
/**
 * B lymphocytes produce antibodies - proteins (gamma globulins) that recognize foreign substances (antigen) and attach themselves to them.  B lymphocytes (or B cells) are each programmed to make one specific antibody.   When a B cell comes across its triggering antigen it gives rise to many large cells known as plasma cells.  Each plasma cell is essentially a factory for producing antibody.  An antibody matches an antigen much like a key matches a lock.  Whenever the antibody and antigen interlock, the antibody marks the antigen for destruction.  B lymphocytes are powerless to penetrate the cell so the job of attacking these target cells is left to T lymphocytes.
 *
 * T lymphocytes are cells that are programmed to recognize, respond to and remember antigens.  T lymphocytes (or T cells) contribute to the immune defenses in two major ways. Some direct and regulate the immune responses.  When stimulated by the antigenic material presented by the macrophages, the T cells make lymphokines that signal other cells.   Other T lymphocytes are able to destroy targeted cells on direct contact.
 */
function Lymphocyte(props) {
  const gltf = useGLTF("/models/cells/lymphocyte.glb");

  return <primitive object={gltf.scene} {...props} />;
}
/**
 * Monocyte: becomes a macrophage or a dendritic cell. Macrophages surround and kill microorganisms, ingest foreign material, remove dead cells, and boost immune responses. During inflammation, dendritic cells boost immune responses by showing antigens on their surface to other cells of the immune system.
 */
function Monocyte(props) {
  const gltf = useGLTF("/models/cells/monocyte.glb");
  return <primitive object={gltf.scene} {...props} />;
}
/**
 * Eosinophilic functions include: movement to inflamed areas, trapping substances, killing cells, anti-parasitic and bactericidal activity, participating in immediate allergic reactions, and modulating inflammatory responses.
 */
function Eosinophil(props) {
  const gltf = useGLTF("/models/cells/eosinophil.glb");
  return <primitive object={gltf.scene} {...props} />;
}
/**
 * Basophils appear in many specific kinds of inflammatory reactions, particularly those that cause allergic symptoms. Basophils contain anticoagulant heparin[citation needed], which prevents blood from clotting too quickly. They also contain the vasodilator histamine, which promotes blood flow to tissues.
 */
function Basophil(props) {
  const gltf = useGLTF("/models/cells/basophil.glb");
  return <primitive object={gltf.scene} {...props} />;
}
/**
 * http://chemocare.com/chemotherapy/what-is-chemotherapy/the-immune-system.aspx
 *
 * Macrophages are the body's first line of defense and have many roles.  A macrophage is the first cell to recognize and engulf foreign substances (antigens).  Macrophages break down these substances and present the smaller proteins to the T lymphocytes.  (T cells are programmed to recognize, respond to and remember antigens).  Macrophages also produce substances called cytokines that help to regulate the activity of lymphocytes.
 */
// function Macrophages(props) {
//   return (
//     <mesh {...props}>
//       <sphereGeometry />
//       <meshLambertMaterial color={props.color} />
//     </mesh>
//   );
// }
